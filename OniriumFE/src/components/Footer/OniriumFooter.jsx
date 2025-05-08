import { Facebook, Instagram, Threads, TwitterX, Youtube } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { Logo } from "../../assets/icons/generic";

const OniriumFooter = () => {
  return (
    <footer className="bg-second-background border-t border-gold/30 py-8">
      <div className="container-fluid py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
             <Logo className="text-gold h-10 w-10 mr-2"/>
              <span className="text-xl font-bold tracking-wider text-gold uppercase font-trajan">
                | onirium
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              La tua porta d'accesso al mondo di Dungeons &amp; Dragons.
              Gestisci campagne, crea personaggi e acquista prodotti per le tue
              avventure.
            </p>
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-400 hover:text-gold">
                <Facebook/>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="/" className="text-gray-400 hover:text-gold">
                <Instagram/>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link to="/" className="text-gray-400 hover:text-gold">
                <TwitterX/>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link to="/" className="text-gray-400 hover:text-gold">
                <Youtube/>
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Navigazione
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-gold">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/Campaign"
                  className="text-sm text-gray-400 hover:text-gold"
                >
                  Campagne
                </Link>
              </li>
              <li>
                <Link
                  to="/Creations"
                  className="text-sm text-gray-400 hover:text-gold"
                >
                  Creazioni
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-sm text-gray-400 hover:text-gold">
                  Shop
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Risorse
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/Guida" className="text-sm text-gray-400 hover:text-gold">
                  Guida per Principianti
                </Link>
              </li>
              <li>
                <Link to="/FAQ" className="text-sm text-gray-400 hover:text-gold">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/regole-base" className="text-sm text-gray-400 hover:text-gold">
                  Regole Base
                </Link>
              </li>
              {/* <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-gold">
                  Blog
                </Link>
              </li> */}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Contatti
            </h3>
            <ul className="space-y-2">
              {/* <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-gold">
                  Supporto
                </Link>
              </li> */}
              <li>
                <Link to="/TerminiServizio" className="text-sm text-gray-400 hover:text-gold">
                  Termini di Servizio
                </Link>
              </li>
              <li>
                <Link to="/PrivacyPolicy" className="text-sm text-gray-400 hover:text-gold">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/ChiSiamo" className="text-sm text-gray-400 hover:text-gold">
                  Chi Siamo
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gold/20 pt-8 text-center">
          <p className="text-xs text-gray-400">
            © 2025 Onirium. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default OniriumFooter;
