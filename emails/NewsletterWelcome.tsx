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
  email: string;
}

export default function NewsletterWelcome({ email }: Props) {
  return (
    <Html>
      <Head />
      <Preview>
        Welcome to the Noire Luxe inner circle — your 10% discount is inside!
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
            <Text style={crown}>♛</Text>
            <Heading style={heroTitle}>Welcome to the Inner Circle</Heading>
            <Text style={heroText}>
              You are officially part of the Noire Luxe family. As a thank you
              for joining, here is your exclusive welcome gift.
            </Text>
          </Section>

          {/* Discount code */}
          <Section style={discountSection}>
            <Text style={discountLabel}>Your exclusive discount code</Text>
            <Text style={discountCode}>WELCOME10</Text>
            <Text style={discountSub}>10% off your first order</Text>
          </Section>

          <Hr style={divider} />

          {/* What to expect */}
          <Section style={body}>
            <Heading style={sectionTitle}>What to Expect</Heading>
            <Text style={bodyText}>
              🛍 Early access to new arrivals and restocks
            </Text>
            <Text style={bodyText}>💛 Exclusive subscriber-only discounts</Text>
            <Text style={bodyText}>
              💄 Expert hair care tips and styling guides
            </Text>
            <Text style={bodyText}>✨ Behind the scenes of the collection</Text>
          </Section>

          <Hr style={divider} />

          {/* CTA */}
          {/* <Section style={ctaSection}>
            <Text style={ctaText}>
              Ready to wear your crown?{' '}
              
                href={`${process.env.NEXT_PUBLIC_APP_URL}/shop`}
                style={link}
              >
              <a>
                Shop the Collection →
              </a>
            </Text>
          </Section> */}

          <Section style={ctaSection}>
            <Text style={bodyText}>
              Track your order at any time:{" "}
              <Link
                href={`${process.env.NEXT_PUBLIC_APP_URL}/shop`}
                style={link}
              >
                Shop the Collection →
              </Link>
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              You are receiving this because you subscribed at noireluxe.com
            </Text>
            <Text style={footerText}>
              © {new Date().getFullYear()} Noire Luxe Collection. All rights
              reserved.
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

const crown = {
  fontSize: "48px",
  margin: "0 0 16px",
  color: "#C9A227",
};

const heroTitle = {
  color: "#0A0A0A",
  fontSize: "26px",
  fontWeight: "700",
  margin: "0 0 16px",
};

const heroText = {
  color: "#5A5A5A",
  fontSize: "15px",
  lineHeight: "1.7",
  margin: "0",
};

const discountSection = {
  backgroundColor: "#0A0A0A",
  padding: "32px 40px",
  textAlign: "center" as const,
  margin: "24px 0",
};

const discountLabel = {
  color: "rgba(250,247,242,0.6)",
  fontSize: "11px",
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  margin: "0 0 12px",
};

const discountCode = {
  color: "#C9A227",
  fontSize: "36px",
  fontWeight: "700",
  letterSpacing: "0.15em",
  margin: "0 0 8px",
};

const discountSub = {
  color: "rgba(250,247,242,0.7)",
  fontSize: "14px",
  margin: "0",
};

const divider = {
  borderColor: "#E8E0D0",
  margin: "0 40px",
};

const body = {
  padding: "24px 40px",
};

const sectionTitle = {
  color: "#0A0A0A",
  fontSize: "15px",
  fontWeight: "700",
  margin: "0 0 16px",
  letterSpacing: "0.05em",
};

const bodyText = {
  color: "#5A5A5A",
  fontSize: "14px",
  lineHeight: "1.7",
  margin: "0 0 8px",
};

const ctaSection = {
  padding: "16px 40px 32px",
  textAlign: "center" as const,
};

const ctaText = {
  color: "#0A0A0A",
  fontSize: "15px",
  fontWeight: "600",
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
