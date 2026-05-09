import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface Props {
  customerName: string;
  orderNumber: string;
  status: string;
  message: string;
}

const statusConfig: Record<
  string,
  { emoji: string; color: string; title: string }
> = {
  confirmed: {
    emoji: "✅",
    color: "#3B8BD4",
    title: "Order Confirmed",
  },
  shipped: {
    emoji: "📦",
    color: "#64B464",
    title: "Order Shipped",
  },
  delivered: {
    emoji: "🎉",
    color: "#C9A227",
    title: "Order Delivered",
  },
  cancelled: {
    emoji: "❌",
    color: "#B4547A",
    title: "Order Cancelled",
  },
};

export default function ShippingUpdate({
  customerName,
  orderNumber,
  status,
  message,
}: Props) {
  const config = statusConfig[status] ?? statusConfig.confirmed;

  return (
    <Html>
      <Head />
      <Preview>
        Update on your Noire Luxe order {orderNumber} — {config.title}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>Noire Luxe Collection</Heading>
            <Text style={headerSubtitle}>Premium Human Hair Wigs</Text>
          </Section>

          {/* Status hero */}
          <Section style={hero}>
            <Text style={emoji}>{config.emoji}</Text>
            <Heading style={{ ...heroTitle, color: config.color }}>
              {config.title}
            </Heading>
            <Text style={heroText}>Hi {customerName},</Text>
            <Text style={heroText}>{message}</Text>
          </Section>

          {/* Order number */}
          <Section style={orderSection}>
            <Text style={orderLabel}>Order Number</Text>
            <Text style={orderValue}>{orderNumber}</Text>
          </Section>

          <Hr style={divider} />

          {/* Track */}
          <Section style={ctaSection}>
            <Text style={bodyText}>
              Track your order at any time:{" "}
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}/orders`}
                style={link}
              >
                Track My Order →
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

const emoji = {
  fontSize: "40px",
  margin: "0 0 12px",
};

const heroTitle = {
  fontSize: "26px",
  fontWeight: "700",
  margin: "0 0 16px",
};

const heroText = {
  color: "#5A5A5A",
  fontSize: "15px",
  lineHeight: "1.7",
  margin: "0 0 8px",
};

const orderSection = {
  padding: "16px 40px",
  backgroundColor: "#FDF0F3",
  textAlign: "center" as const,
};

const orderLabel = {
  color: "#6B4C55",
  fontSize: "11px",
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  margin: "0 0 4px",
};

const orderValue = {
  color: "#0A0A0A",
  fontSize: "20px",
  fontWeight: "700",
  margin: "0",
};

const divider = {
  borderColor: "#E8E0D0",
  margin: "0 40px",
};

const ctaSection = {
  padding: "24px 40px",
};

const bodyText = {
  color: "#5A5A5A",
  fontSize: "14px",
  lineHeight: "1.7",
  margin: "0",
};

const link = {
  color: "#C9A227",
  textDecoration: "underline",
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
