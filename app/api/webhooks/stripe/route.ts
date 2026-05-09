import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { sendNewOrderNotificationEmail, sendOrderConfirmationEmail } from "@/actions/email.actions";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe signature" },
      { status: 400 },
    );
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error: any) {
    console.error("Webhook signature verification failed:", error.message);
    return NextResponse.json(
      { error: `Webhook error: ${error.message}` },
      { status: 400 },
    );
  }

  await connectDB();

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;

      const order = await Order.findOneAndUpdate(
        { paymentRef: paymentIntent.id },
        {
          $set: {
            paymentStatus: "paid",
            status: "confirmed",
          },
        },
        { new: true },
      );

      if (order) {
        // Send confirmation to customer
        try {
          await sendOrderConfirmationEmail({
            customerName: order.customer.name,
            customerEmail: order.customer.email,
            orderNumber: order.orderNumber,
            items: order.items,
            subtotal: order.subtotal,
            shippingCost: order.shippingCost,
            total: order.total,
            type: order.type,
            shippingAddress: order.shippingAddress,
          });
        } catch (emailError) {
          console.error("Failed to send confirmation email:", emailError);
        }

        // Send notification to admin
        try {
          await sendNewOrderNotificationEmail({
            customerName: order.customer.name,
            customerEmail: order.customer.email,
            orderNumber: order.orderNumber,
            items: order.items,
            total: order.total,
            type: order.type,
          });
        } catch (emailError) {
          console.error("Failed to send admin notification:", emailError);
        }
      }
      break;
    }

    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      await Order.findOneAndUpdate(
        { paymentRef: paymentIntent.id },
        { $set: { paymentStatus: "failed" } },
      );
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
