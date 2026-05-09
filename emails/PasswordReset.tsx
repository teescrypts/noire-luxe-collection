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
  resetUrl: string;
  customerName: string;
}

export default function PasswordResetEmail({ resetUrl, customerName }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Reset your Noire Luxe Collection password</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={headerTitle}>Noire Luxe Collection</Heading>
            <Text style={headerSubtitle}>Premium Human Hair Wigs</Text>
          </Section>

          {/* Body */}
          <Section style={body}>
            <Heading style={title}>Reset Your Password</Heading>
            <Text style={bodyText}>Hi {customerName},</Text>
            <Text style={bodyText}>
              We received a request to reset the password for your Noire Luxe
              Collection account. Click the button below to choose a new
              password.
            </Text>

            {/* CTA Button */}
            <Section style={ctaSection}>
              <Link href={resetUrl} style={ctaButton}>
                Reset My Password
              </Link>
            </Section>

            <Text style={bodyText}>
              This link will expire in <strong>1 hour</strong> for security
              reasons.
            </Text>

            <Hr style={divider} />

            <Text style={smallText}>
              If you did not request a password reset, you can safely ignore
              this email. Your password will not be changed.
            </Text>

            <Text style={smallText}>
              For security, this link can only be used once. If you need to
              reset your password again, please submit a new request.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Questions? Email us at{" "}
              <Link href="mailto:hello@noireluxe.com" style={footerLink}>
                hello@noireluxe.com
              </Link>
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

const body = {
  padding: "40px 40px 24px",
};

const title = {
  color: "#0A0A0A",
  fontSize: "24px",
  fontWeight: "700",
  margin: "0 0 24px",
};

const bodyText = {
  color: "#5A5A5A",
  fontSize: "15px",
  lineHeight: "1.7",
  margin: "0 0 16px",
};

const ctaSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const ctaButton = {
  backgroundColor: "#C9A227",
  color: "#0A0A0A",
  fontSize: "14px",
  fontWeight: "600",
  letterSpacing: "0.08em",
  textDecoration: "none",
  textTransform: "uppercase" as const,
  padding: "14px 32px",
  borderRadius: "4px",
  display: "inline-block",
};

const divider = {
  borderColor: "#E8E0D0",
  margin: "24px 0",
};

const smallText = {
  color: "#9A9A9A",
  fontSize: "13px",
  lineHeight: "1.6",
  margin: "0 0 12px",
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

const footerLink = {
  color: "#C9A227",
  textDecoration: "underline",
};
