import {
  Html,
  Head,
  Button,
  Text,
  Container,
  Heading,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

export const InvitationEmail = ({ name, campaignName, inviterName, confirmationLink }) => (
  <Html lang="it">
    <Head />
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              gold: "#C8A45F",
              goldLight: " #f0dea7",
              dark: "#121212",
              secondary: "#BBBBBB",
              secondBg: "#1C1C1B",
            },
          },
        },
      }}
    >
      <Container className="bg-secondBg text-white p-6 rounded-lg max-w-md mx-auto">
        <Heading className="text-gold text-2xl mb-4">
          Invito a una Campagna
        </Heading>

        <Text className="text-secondary mb-4">
          Ciao {name}, sei stato invitato a unirti alla campagna di D&D{" "}
          <span className="text-gold font-semibold">{campaignName}</span>.
        </Text>

        <div className="bg-dark p-4 rounded mb-4">
          <Text className="text-gold text-sm font-medium">Campagna</Text>
          <Text className="text-white text-base">{campaignName}</Text>

          <Text className="text-gold text-sm font-medium mt-3">
            Invitato da
          </Text>
          <Text className="text-white text-base">{inviterName}</Text>
        </div>

        <Text className="mb-4">
          Clicca il pulsante qui sotto per accettare l'invito e partecipare alla
          campagna:
        </Text>

        <Button
          href={confirmationLink}
          className="bg-gold text-black font-bold py-3 px-6 rounded inline-block text-center"
        >
          Accetta l'invito
        </Button>

        <Text className="text-secondary text-sm mt-6">
          Se non ti aspettavi questa email, puoi ignorarla in sicurezza.
        </Text>
        <Text className="text-secondary text-sm">- Il team Valazma</Text>
      </Container>
    </Tailwind>
  </Html>
);

InvitationEmail.PreviewProps = {
  name: "Mario Rossi",
  campaignName: "La Cripta del Terrore",
  inviterName: "DungeonMaster99",
  confirmationLink: "https://valazma.com/inviti/campagna/abc123?token=xyz456"
};
