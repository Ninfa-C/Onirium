import { Compass, House, Pin } from "react-bootstrap-icons";
import { Scroll } from "../../assets/icons/generic";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div class="min-h-screen flex flex-col items-center justify-center p-4 bg-dark">
      <div class="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/11/dnd-castle-on-a-cliff.jpg')] bg-cover bg-center opacity-40"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-dark-darker/80 to-dark/90"></div>
      </div>
      <div class="relative z-10 max-w-3xl w-full mx-auto text-center space-y-8">
        <h1 class="text-9xl text-gold-light tracking-wider">404</h1>

        <div class="space-y-4">
          <h2 class="text-3xl text-gold font-trajan">Pergamena Smarrita</h2>
          <p class="text-xl text-secondary mb-2">
            Il sentiero che hai percorso conduce a terre inesplorate.
          </p>
          <p class="text-secondary/80 mb-8">
            La pagina che cerchi potrebbe essere stata spostata, rimossa, o
            forse non è mai esistita in questo regno.
          </p>
        </div>
        <div class="flex items-center justify-center my-8">
          <div class="h-px w-1/4 bg-gold/30"></div>
          <Compass className="text-gold mx-4 h-6 w-6" />
          <div class="h-px w-1/4 bg-gold/30"></div>
        </div>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 border border-gold/50 text-gold hover:bg-gold/10 hover:text-gold-light "
          >
            <House />
            <span>Torna alla Locanda</span>
          </Link>
          <Link
            to="/campaign"
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 border border-gold/50 text-gold hover:bg-gold/10 hover:text-gold-light "
          >
            <Scroll />
            <span>Esplora Campagne</span>
          </Link>
        </div>
        <div class="mt-12 p-6 bg-second-background border border-gold/20 rounded-lg">
          <blockquote class="italic text-secondary/90">
            "Non tutti coloro che vagano sono perduti. Ma in questo caso, sì, ti
            sei proprio perso."
            <footer class="text-gold mt-2">— L'Oracolo di Onirium</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
