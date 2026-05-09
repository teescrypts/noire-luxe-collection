import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface Props {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactFormEmail({
  name,
  email,
  subject,
  message,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>New contact form message from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>Noire Luxe Collection</Heading>
            <Text style={headerSubtitle}>New Contact Form Message</Text>
          </Section>

          <Section style={body}>
            <Heading style={sectionTitle}>Message Details</Heading>

            <Text style={label}>From</Text>
            <Text style={value}>{name}</Text>

            <Text style={label}>Email</Text>
            <Text style={value}>
              <a href={`mailto:${email}`} style={link}>
                {email}
              </a>
            </Text>

            <Text style={label}>Subject</Text>
            <Text style={value}>{subject || "No subject provided"}</Text>

            <Hr style={divider} />

            <Text style={label}>Message</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Reply directly to this email to respond to {name}.
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

const body = {
  padding: "32px 40px",
};

const sectionTitle = {
  color: "#0A0A0A",
  fontSize: "16px",
  fontWeight: "700",
  margin: "0 0 24px",
};

const label = {
  color: "#6B4C55",
  fontSize: "11px",
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  margin: "0 0 4px",
};

const value = {
  color: "#0A0A0A",
  fontSize: "15px",
  fontWeight: "600",
  margin: "0 0 16px",
};

const messageText = {
  color: "#5A5A5A",
  fontSize: "15px",
  lineHeight: "1.8",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
  backgroundColor: "#FDF0F3",
  padding: "16px",
  borderRadius: "4px",
  borderLeft: "3px solid #C9A227",
};

const divider = {
  borderColor: "#E8E0D0",
  margin: "16px 0",
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
