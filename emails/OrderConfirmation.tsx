import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
  length: string;
}

interface Props {
  customerName: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  type: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export default function OrderConfirmation({
  customerName,
  orderNumber,
  items,
  subtotal,
  shippingCost,
  total,
  type,
  shippingAddress,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>
        Your Noire Luxe Collection order {orderNumber} is confirmed!
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>Noire Luxe Collection</Heading>
            <Text style={headerSubtitle}>Premium Human Hair Wigs</Text>
          </Section>

          {/* Hero */}
          <Section style={hero}>
            <Heading style={heroTitle}>Order Confirmed! ✨</Heading>
            <Text style={heroText}>
              Thank you, {customerName}. Your order has been received and is
              being prepared with care.
            </Text>
          </Section>

          {/* Order number */}
          <Section style={orderNumberSection}>
            <Text style={orderNumberLabel}>Order Number</Text>
            <Text style={orderNumberValue}>{orderNumber}</Text>
          </Section>

          <Hr style={divider} />

          {/* Items */}
          <Section>
            <Heading style={sectionTitle}>Items Ordered</Heading>
            {items.map((item, i) => (
              <Row key={i} style={itemRow}>
                <Column style={itemInfo}>
                  <Text style={itemName}>{item.name}</Text>
                  <Text style={itemMeta}>
                    {item.length} · Qty: {item.quantity}
                  </Text>
                </Column>
                <Column style={itemPriceCol}>
                  <Text style={itemPrice}>${item.price * item.quantity}</Text>
                </Column>
              </Row>
            ))}
          </Section>

          <Hr style={divider} />

          {/* Totals */}
          <Section>
            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>Subtotal</Text>
              </Column>
              <Column style={totalValueCol}>
                <Text style={totalValue}>${subtotal}</Text>
              </Column>
            </Row>
            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>Shipping</Text>
              </Column>
              <Column style={totalValueCol}>
                <Text style={totalValue}>
                  {shippingCost === 0 ? "Free" : `$${shippingCost}`}
                </Text>
              </Column>
            </Row>
            <Hr style={divider} />
            <Row style={totalRow}>
              <Column>
                <Text style={grandTotalLabel}>Total</Text>
              </Column>
              <Column style={totalValueCol}>
                <Text style={grandTotalValue}>${total}</Text>
              </Column>
            </Row>
          </Section>

          <Hr style={divider} />

          {/* Delivery info */}
          <Section>
            <Heading style={sectionTitle}>
              {type === "pickup" ? "Pickup Information" : "Shipping To"}
            </Heading>
            {type === "pickup" ? (
              <Text style={bodyText}>
                We will contact you to arrange a convenient pickup time. Please
                check your email for further instructions.
              </Text>
            ) : shippingAddress ? (
              <Text style={bodyText}>
                {shippingAddress.street}
                {"\n"}
                {shippingAddress.city}, {shippingAddress.state}{" "}
                {shippingAddress.zip}
              </Text>
            ) : null}
          </Section>

          <Hr style={divider} />

          {/* Track order */}
          <Section style={ctaSection}>
            <Text style={bodyText}>
              You can track your order at any time using your order number.
            </Text>
            <Text style={trackText}>
              Visit:{" "}
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}/orders`}
                style={link}
              >
                Track My Order
              </Link>
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Questions? Email us at{" "}
              <Link href="mailto:hello@noireluxe.com" style={link}>
                hello@noireluxe.com
              </Link>
            </Text>
            <Text style={footerText}>
              © {new Date().getFullYear()} Noire Luxe Collection.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// ── Styles ────────────────────────────────────────────────

const main = {
  backgroundColor: "#FAF7F2",
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
};

const container = {
  margin: "0 auto",
  maxWidth: "600px",
  backgroundColor: "#FFFFFF",
};

const header = {
  backgroundColor: "#0A0A0A",
  padding: "32px 40px",
  textAlign: "center" as const,
};

const headerTitle = {
  color: "#C9A227",
  fontSize: "24px",
  fontWeight: "700",
  margin: "0 0 4px",
  letterSpacing: "0.05em",
};

const headerSubtitle = {
  color: "rgba(250,247,242,0.6)",
  fontSize: "12px",
  margin: "0",
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
};

const hero = {
  padding: "40px 40px 24px",
  textAlign: "center" as const,
};

const heroTitle = {
  color: "#0A0A0A",
  fontSize: "28px",
  fontWeight: "700",
  margin: "0 0 12px",
};

const heroText = {
  color: "#5A5A5A",
  fontSize: "16px",
  lineHeight: "1.7",
  margin: "0",
};

const orderNumberSection = {
  padding: "16px 40px",
  backgroundColor: "#FDF0F3",
  textAlign: "center" as const,
};

const orderNumberLabel = {
  color: "#6B4C55",
  fontSize: "11px",
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  margin: "0 0 4px",
};

const orderNumberValue = {
  color: "#0A0A0A",
  fontSize: "22px",
  fontWeight: "700",
  margin: "0",
};

const divider = {
  borderColor: "#E8E0D0",
  margin: "0 40px",
};

const sectionTitle = {
  color: "#0A0A0A",
  fontSize: "14px",
  fontWeight: "600",
  margin: "24px 40px 16px",
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
};

const itemRow = {
  padding: "8px 40px",
};

const itemInfo = {
  width: "75%",
};

const itemName = {
  color: "#0A0A0A",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 2px",
};

const itemMeta = {
  color: "#5A5A5A",
  fontSize: "12px",
  margin: "0",
};

const itemPriceCol = {
  width: "25%",
  textAlign: "right" as const,
};

const itemPrice = {
  color: "#0A0A0A",
  fontSize: "14px",
  fontWeight: "700",
  margin: "0",
};

const totalRow = {
  padding: "4px 40px",
};

const totalLabel = {
  color: "#5A5A5A",
  fontSize: "14px",
  margin: "0",
};

const totalValueCol = {
  textAlign: "right" as const,
};

const totalValue = {
  color: "#0A0A0A",
  fontSize: "14px",
  margin: "0",
};

const grandTotalLabel = {
  color: "#0A0A0A",
  fontSize: "16px",
  fontWeight: "700",
  margin: "0",
};

const grandTotalValue = {
  color: "#C9A227",
  fontSize: "20px",
  fontWeight: "700",
  margin: "0",
};

const bodyText = {
  color: "#5A5A5A",
  fontSize: "14px",
  lineHeight: "1.7",
  margin: "0 40px 12px",
};

const trackText = {
  color: "#5A5A5A",
  fontSize: "14px",
  margin: "0 40px",
};

const link = {
  color: "#C9A227",
  textDecoration: "underline",
};

const ctaSection = {
  padding: "24px 0",
};

const footer = {
  backgroundColor: "#0A0A0A",
  padding: "24px 40px",
  textAlign: "center" as const,
};

const footerText = {
  color: "rgba(250,247,242,0.5)",
  fontSize: "12px",
  margin: "0 0 4px",
};
