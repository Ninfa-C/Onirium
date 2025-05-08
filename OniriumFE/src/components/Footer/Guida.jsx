import {
  BookOpenIcon,
  MapPinIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Scroll } from "../../assets/icons/generic";
import { Shield } from "react-bootstrap-icons";
import { Taglienti } from "../../assets/icons/dmgType";
import { Link } from "react-router-dom";

const Guida = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-darker via-dark-lighter to-gold/10">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-gold">
            Guida per Principianti
          </h1>
          <p className="text-xl text-gray-400">
            Il tuo primo passo nel mondo di Dungeons & Dragons
          </p>
        </div>

        <div className="mx-auto max-w-4xl rounded-lg border border-gold/20 bg-dark/80 p-6 shadow-lg shadow-gold/5">
          <div className="mb-8 flex items-center justify-center gap-3">
            <Scroll className="h-8 w-8  text-gold" />
            <h2 className="text-2xl text-gold">
              Benvenuto, Avventuriero!
            </h2>
          </div>

          <p className="mb-6 text-gray-300">
            Dungeons & Dragons è un gioco di ruolo fantasy che permette di
            vivere avventure epiche in mondi immaginari. Questa guida ti aiuterà
            a muovere i primi passi in questo affascinante universo.
          </p>

          <div className="mb-8 space-y-8">
            <div className="rounded-lg border border-gold/30  bg-second-background/50 p-4">
              <div className="mb-3 flex items-center">
                <BookOpenIcon className="mr-3 h-6 w-6 text-gold" />
                <h3 className="text-xl text-gold">
                  I Fondamenti
                </h3>
              </div>
              <p className="text-gray-300">
                D&D è un gioco collaborativo dove un gruppo di giocatori,
                guidati da un Dungeon Master (DM), crea una storia interattiva.
                Il DM descrive l'ambiente, interpreta i personaggi non giocanti
                e stabilisce le sfide, mentre i giocatori decidono le azioni dei
                loro personaggi.
              </p>
            </div>

            <div className="rounded-lg border border-gold/30  bg-second-background/50  p-4">
              <div className="mb-3 flex items-center">
                <SparklesIcon className="mr-3 h-6 w-6 text-gold" />
                <h3 className="text-xl  text-gold">
                  Creazione del Personaggio
                </h3>
              </div>
              <p className="text-gray-300">
                Il tuo personaggio è il tuo alter ego nel mondo di D&D. Scegli
                una razza (come elfo, nano o umano), una classe (come guerriero,
                mago o ladro) e definisci le caratteristiche come forza,
                destrezza e intelligenza che determineranno le tue capacità.
              </p>
            </div>

            <div className="rounded-lg border border-gold/30  bg-second-background/50 p-4">
              <div className="mb-3 flex items-center">
                <Shield className="mr-3 h-6 w-6 text-gold" />
                <h3 className="text-xl  text-gold">
                  Meccaniche di Gioco
                </h3>
              </div>
              <p className="text-gray-300">
                Le azioni in D&D sono risolte lanciando dadi, principalmente il
                d20 (dado a 20 facce). Aggiungi modificatori basati sulle
                caratteristiche del tuo personaggio e confronta il risultato con
                la difficoltà dell'azione per determinare il successo o il
                fallimento.
              </p>
            </div>

            <div className="rounded-lg border border-gold/30  bg-second-background/50 p-4">
              <div className="mb-3 flex items-center">
                <Taglienti className="mr-3 h-6 w-6 text-gold rotate-45" />
                <h3 className="text-xl  text-gold">
                  Combattimento
                </h3>
              </div>
              <p className="text-gray-300">
                Il combattimento si svolge in turni. Durante il tuo turno, puoi
                muoverti ed eseguire un'azione, come attaccare, lanciare un
                incantesimo o usare un oggetto. Gli attacchi richiedono un tiro
                del d20 per colpire, seguito da un tiro per determinare il danno
                inflitto.
              </p>
            </div>

            <div className="rounded-lg border border-gold/30  bg-second-background/50 p-4">
              <div className="mb-3 flex items-center">
                <MapPinIcon className="mr-3 h-6 w-6 text-gold" />
                <h3 className="text-xl  text-gold">Avventure</h3>
              </div>
              <p className="text-gray-300">
                Le avventure possono includere esplorazione di dungeon,
                interazioni con personaggi non giocanti, risoluzione di enigmi e
                combattimenti contro mostri. Il DM guida la narrazione, ma sono
                le scelte dei giocatori a plasmare la storia.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-gold/20 bg-gold/5 p-4">
            <h3 className="mb-2 text-xl  text-gold">
              Prossimi Passi
            </h3>
            <p className="text-gray-300">
              Ora che conosci le basi, puoi unirti a una campagna esistente o
              crearne una nuova. Esplora le nostre risorse per approfondire le
              regole, scoprire nuovi mondi e migliorare la tua esperienza di
              gioco.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                to="/regole-base"
                className="rounded-md border border-gold/30  bg-second-background/50 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/20"
              >
                Regole Base
              </Link>
              <Link
                to="/Creations/Character/Create"
                className="rounded-md border border-gold/30  bg-second-background/50 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/20"
              >
                Crea Personaggio
              </Link>
              <Link
                to="/Campaign"
                className="rounded-md border border-gold/30  bg-second-background/50 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/20"
              >
                Trova Campagna
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guida;
