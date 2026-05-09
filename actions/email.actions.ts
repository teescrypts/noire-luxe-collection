"use server";

import { render } from "@react-email/render";
import resend from "@/lib/resend";
import OrderConfirmation from "@/emails/OrderConfirmation";
import ShippingUpdate from "@/emails/ShippingUpdate";
import ContactFormEmail from "@/emails/ContactForm";
import NewsletterWelcome from "@/emails/NewsletterWelcome";
import { connectDB } from "@/lib/db";
import Subscriber from "@/models/Subscriber";
import { validateContact, validateNewsletterEmail } from "@/lib/validation";

const FROM_EMAIL = "Noire Luxe Collection <orders@noireluxecollection.com>";
const ADMIN_EMAIL = "Likapurnell@yahoo.com";

// ── Order confirmation ────────────────────────────────────

export async function sendOrderConfirmationEmail(data: {
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  items: any[];
  subtotal: number;
  shippingCost: number;
  total: number;
  type: string;
  shippingAddress?: any;
}) {
  const html = await render(
    OrderConfirmation({
      customerName: data.customerName,
      orderNumber: data.orderNumber,
      items: data.items,
      subtotal: data.subtotal,
      shippingCost: data.shippingCost,
      total: data.total,
      type: data.type,
      shippingAddress: data.shippingAddress,
    }),
  );

  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.customerEmail,
    subject: `Order Confirmed — ${data.orderNumber} | Noire Luxe Collection`,
    html,
  });
}

// ── Shipping update ───────────────────────────────────────

export async function sendShippingUpdateEmail(data: {
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  status: string;
}) {
  const statusMessages: Record<string, string> = {
    confirmed: `Your order ${data.orderNumber} has been confirmed and is being prepared with care.`,
    shipped: `Great news! Your order ${data.orderNumber} is on its way to you.`,
    delivered: `Your order ${data.orderNumber} has been delivered. We hope you love it!`,
    cancelled: `Your order ${data.orderNumber} has been cancelled. Please contact us if you have any questions.`,
  };

  const message =
    statusMessages[data.status] ??
    `Your order ${data.orderNumber} has been updated.`;

  const html = await render(
    ShippingUpdate({
      customerName: data.customerName,
      orderNumber: data.orderNumber,
      status: data.status,
      message,
    }),
  );

  const subjects: Record<string, string> = {
    confirmed: `Order Confirmed — ${data.orderNumber}`,
    shipped: `Your Order is On Its Way — ${data.orderNumber}`,
    delivered: `Order Delivered — ${data.orderNumber}`,
    cancelled: `Order Cancelled — ${data.orderNumber}`,
  };

  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.customerEmail,
    subject: `${subjects[data.status] ?? `Order Update — ${data.orderNumber}`} | Noire Luxe Collection`,
    html,
  });
}

// ── Contact form ──────────────────────────────────────────

export async function sendContactFormEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { valid, errors } = validateContact(data);
  if (!valid) throw new Error(errors[0].message);

  const html = await render(
    ContactFormEmail({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    }),
  );

  // Send to store owner
  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    replyTo: data.email,
    subject: `New Message: ${data.subject || "No subject"} — from ${data.name}`,
    html,
  });
}

// ── Newsletter welcome ────────────────────────────────────

export async function sendNewsletterWelcomeEmail(data: { email: string }) {
  const { valid, errors } = validateNewsletterEmail(data.email);
  if (!valid) throw new Error(errors[0].message);
  await connectDB();

  // Save to subscribers collection
  try {
    await Subscriber.create({ email: data.email.toLowerCase() });
  } catch (error: any) {
    // Duplicate key — already subscribed
    if (error.code === 11000) {
      throw new Error("This email is already subscribed.");
    }
    throw error;
  }

  const html = await render(NewsletterWelcome({ email: data.email }));

  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: "Welcome to the Inner Circle 👑 — Here is Your 10% Discount",
    html,
  });
}

// ── Low stock alert to admin ──────────────────────────────

export async function sendLowStockAlertEmail(data: {
  productName: string;
  stockCount: number;
  productSlug: string;
}) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `⚠ Low Stock Alert — ${data.productName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9A227;">Low Stock Alert</h2>
        <p><strong>${data.productName}</strong> has only <strong>${data.stockCount}</strong> unit(s) remaining.</p>
        <p>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/products" style="color: #C9A227;">
            Manage Inventory →
          </a>
        </p>
      </div>
    `,
  });
}

export async function sendNewOrderNotificationEmail(data: {
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  items: any[];
  total: number;
  type: string;
}) {
  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject: `🛍 New Order Received — ${data.orderNumber}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #fff;">

        <div style="background: #0A0A0A; padding: 32px 40px; text-align: center;">
          <h1 style="color: #C9A227; margin: 0 0 4px; font-size: 22px; letter-spacing: 0.05em;">
            Noire Luxe Collection
          </h1>
          <p style="color: rgba(250,247,242,0.6); margin: 0; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase;">
            New Order Notification
          </p>
        </div>

        <div style="padding: 32px 40px;">
          <h2 style="color: #0A0A0A; margin: 0 0 8px; font-size: 20px;">
            New Order Placed! 🎉
          </h2>
          <p style="color: #5A5A5A; font-size: 15px; line-height: 1.7; margin: 0 0 24px;">
            A new order has been placed and is awaiting confirmation.
          </p>

          <!-- Order details -->
          <div style="background: #FDF0F3; padding: 20px 24px; border-radius: 8px; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; color: #6B4C55; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">
                  Order Number
                </td>
                <td style="padding: 6px 0; color: #0A0A0A; font-weight: 700; font-size: 15px; text-align: right;">
                  ${data.orderNumber}
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #6B4C55; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">
                  Customer
                </td>
                <td style="padding: 6px 0; color: #0A0A0A; font-weight: 600; font-size: 14px; text-align: right;">
                  ${data.customerName}
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #6B4C55; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">
                  Email
                </td>
                <td style="padding: 6px 0; color: #0A0A0A; font-size: 14px; text-align: right;">
                  <a href="mailto:${data.customerEmail}" style="color: #C9A227;">
                    ${data.customerEmail}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #6B4C55; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">
                  Fulfillment
                </td>
                <td style="padding: 6px 0; color: #0A0A0A; font-weight: 600; font-size: 14px; text-align: right; text-transform: capitalize;">
                  ${data.type}
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #6B4C55; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;">
                  Order Total
                </td>
                <td style="padding: 6px 0; color: #C9A227; font-weight: 700; font-size: 18px; text-align: right;">
                  $${data.total}
                </td>
              </tr>
            </table>
          </div>

          <!-- Items -->
          <h3 style="color: #0A0A0A; font-size: 13px; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 12px;">
            Items Ordered
          </h3>
          ${data.items
            .map(
              (item: any) => `
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #E8E0D0;">
              <div>
                <div style="color: #0A0A0A; font-weight: 600; font-size: 14px;">
                  ${item.name}
                </div>
                <div style="color: #5A5A5A; font-size: 12px;">
                  ${item.length} · Qty: ${item.quantity}
                </div>
              </div>
              <div style="color: #0A0A0A; font-weight: 700; font-size: 14px;">
                $${item.price * item.quantity}
              </div>
            </div>
          `,
            )
            .join("")}

          <!-- CTA -->
          <div style="text-align: center; margin-top: 32px;">
            
              href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/orders"
              style="background: linear-gradient(135deg, #C9A227, #E2C06A); color: #0A0A0A; font-weight: 700; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; text-decoration: none; padding: 14px 32px; border-radius: 4px; display: inline-block;"
            >
              View Order in Dashboard →
            </a>
          </div>
        </div>

        <div style="background: #0A0A0A; padding: 24px 40px; text-align: center;">
          <p style="color: rgba(250,247,242,0.5); font-size: 12px; margin: 0;">
            © ${new Date().getFullYear()} Noire Luxe Collection. All rights reserved.
          </p>
        </div>
      </div>
    `,
  });
}
