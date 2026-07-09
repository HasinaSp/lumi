import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

type Props = {
  clientName: string;
  restaurantName: string;
  reportUrl: string;
};

export default function AuditCompletedEmail({
  clientName,
  restaurantName,
  reportUrl,
}: Props) {
  return (
    <Html>
      <Head />

      <Preview>
        Votre audit LUMI est disponible.
      </Preview>

      <Body
        style={{
          backgroundColor: "#f8f7f3",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "40px auto",
            background: "#ffffff",
            borderRadius: "20px",
            padding: "40px",
          }}
        >
          <Heading>LUMI</Heading>

          <Text>
            Bonjour {clientName},
          </Text>

          <Text>
            Votre audit pour <strong>{restaurantName}</strong> est terminé.
          </Text>

          <Section style={{ margin: "32px 0" }}>
            <Button
              href={reportUrl}
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: "16px 28px",
                borderRadius: "999px",
                textDecoration: "none",
              }}
            >
              Consulter mon rapport
            </Button>
          </Section>

          <Text>
            Merci de votre confiance.
          </Text>

          <Text>
            L'équipe LUMI
          </Text>
        </Container>
      </Body>
    </Html>
  );
}