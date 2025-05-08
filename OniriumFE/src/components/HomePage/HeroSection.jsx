import { Button } from "../Generic/ButtonCustom";

const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/11/dnd-castle-on-a-cliff.jpg')] bg-cover bg-center opacity-40"></div>
      <div className="container-fluid relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 uppercase">
            inizia ora <br />
            la tua avventura
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Gestisci le tue campagne D&D, incontra nuovi giocatori, e acquista
            tutto il necessario per rendere uniche le tue sessioni.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="uppercase h-10 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium bg-second-background hover:bg-gold/30 hover:text-white text-gray-300 px-8 py-6 text-lg">
              inizia il tuo viaggio
            </Button>
            <Button className="border uppercase h-10 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg">
              vai al negozio
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
