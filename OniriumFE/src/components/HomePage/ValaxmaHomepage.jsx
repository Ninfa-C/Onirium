import { Bag, Book, People } from "react-bootstrap-icons";
import HeroSection from "./HeroSection";
import HomeCard from "./HomeCard";
import { Button, CustomButton } from "../Generic/ButtonCustom";
import { Link } from "react-router-dom";

const ValaxmaHomepage = () => {
  return (
    <main className="border-b-gold">
      <HeroSection />
      <section className="py-16">
        <div className="container-fluid">
          <h2 className="text-3xl font-bold text-gold text-center mb-12">
            TUTTO IN UN UNICO POSTO
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <HomeCard
              icon={<Book className="h-6 w-6 text-white" />}
              title="forgia la tua leggenda"
              description="Crea e gestisci le tue campagne di D&D con potenti strumenti per master e giocatori."
              listItem={[
                "Monitora l'avanzamento",
                "Gestisci PNG e luoghi",
                "Condividi appunti",
              ]}
              linkText="ESPLORA"
              linkHref="/campaigns"
            />
            <div className="">
              <img
                src="/forge.jpg"
                alt="Sfondo Onirico"
                className="h-full w-full object-cover  brightness-[0.4] border border-gold/30 rounded-lg"
              />
            </div>
            <HomeCard
              icon={<People className="h-6 w-6 text-white" />}
              title="laboratorio degli eroi"
              description="Dai vita ai tuoi personaggi con uno strumento intuitivo e ispirato all’essenza del gioco di ruolo."
              listItem={[
                "Crea il tuo eroe passo dopo passo",
                "Personalizza razza, classe e background",
                "Visualizza e gestisci la tua scheda online",
              ]}
              linkText="CREA IL TUO PERSONAGGIO"
              linkHref="/creations/character/create"
            />
            {/* <HomeCard
              icon={<Bag className="h-6 w-6 text-white" />}
              title="armeria del viandante"
              description="Il tuo negozio per manuali, dadi e miniature di qualità."
              listItem={[
                "Merchandise ufficiale D&D e Valaxma Genesis",
                "Dadi artigianali e accessori",
                "Miniature dipinte a mano",
              ]}
              linkText="VISITA IL NEGOZIO"
              linkHref="/marketplace"
            /> */}
          </div>
        </div>
      </section>
      <section className="py-16 px-4 text-center">
        <div className="max-w-3x1 mx-auto container ">
          <h2 className="text-gold uppercase mb-4 text-3xl">
            Pronto per l'avventura?
          </h2>
          <p className="mb-8">
            Inizia a creare il tuo eroe oggi e preparati a vivere avventure
            indimenticabili nei regni fantastici di D&D.
          </p>
          <Link to="/Creations">
            <Button className="uppercase text-xl px-8 py-8 border border-gold/30 rounded-full hover:bg-gold/30">
              crea il tuo personaggio
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ValaxmaHomepage;
