import { BookOpenIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { D20 } from "../../assets/icons/dice";
import { Bookmark, Shield } from "react-bootstrap-icons";
import { Taglienti } from "../../assets/icons/dmgType";
import { Link } from "react-router-dom";

const RegoleBase = () => {
    return (  <div className="min-h-screen bg-gradient-to-b from-dark-darker via-dark-lighter to-gold/10">
        <div className="container mx-auto px-4 py-12">
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
                <BookOpenIcon className="h-10 w-10 text-gold" />              
            </div>
            <h1 className="mb-2 text-4xl tracking-tight text-gold">Regole Base</h1>
            <p className="text-xl text-gray-400">I fondamenti del sistema di gioco di Dungeons & Dragons</p>
          </div>
  
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border  border-gold/20 bg-dark/80  p-6 shadow-lg shadow-gold/5">
                <div className="mb-4 flex items-center">
                  <D20 className="mr-3 h-6 w-6 text-gold" />
                  <h2 className="text-2xl text-gold">Tiri di Dado</h2>
                </div>
                <p className="text-gray-300">
                  D&D utilizza dadi poliedrici: d4, d6, d8, d10, d12 e d20. Il d20 è il più importante e viene usato per
                  determinare il successo delle azioni. Si aggiunge un modificatore al risultato e si confronta con la
                  difficoltà dell'azione (CD).
                </p>
                <div className="mt-4 rounded-md bg-gold/10 p-3">
                  <h3 className="mb-2 font-semibold text-gold">Esempio:</h3>
                  <p className="text-sm text-gray-300">
                    Per colpire un nemico, tira d20 + modificatore di attacco. Se il risultato è uguale o superiore alla
                    Classe Armatura del nemico, l'attacco va a segno.
                  </p>
                </div>
              </div>
  
              <div className="rounded-lg border  border-gold/20 bg-dark/80  p-6 shadow-lg shadow-gold/5">
                <div className="mb-4 flex items-center">
                  <Bookmark className="mr-3 h-6 w-6 text-gold" />
                  <h2 className="text-2xl text-gold">Caratteristiche</h2>
                </div>
                <p className="text-gray-300">
                  Ogni personaggio ha sei caratteristiche principali: Forza, Destrezza, Costituzione, Intelligenza,
                  Saggezza e Carisma. Queste determinano le capacità del personaggio e influenzano tutti i tiri di dado.
                </p>
                <div className="mt-4 rounded-md bg-gold/10 p-3">
                  <h3 className="mb-2 font-semibold text-gold">Modificatori:</h3>
                  <p className="text-sm text-gray-300">
                    Ogni caratteristica ha un modificatore calcolato come (punteggio - 10) / 2, arrotondato per difetto.
                    Ad esempio, una Forza di 16 dà un modificatore di +3.
                  </p>
                </div>
              </div>
            </div>
  
            <div className="mb-8 rounded-lg border  border-gold/20 bg-dark/80  p-6 shadow-lg shadow-gold/5">
              <div className="mb-4 flex items-center">
                <Taglienti className="mr-3 h-6 w-6 text-gold rotate-45" />
                <h2 className="text-2xl text-gold">Combattimento</h2>
              </div>
              <p className="mb-4 text-gray-300">
                Il combattimento si svolge in turni, con ogni partecipante che agisce in ordine di iniziativa (d20 +
                modificatore di Destrezza). Durante il tuo turno, puoi muoverti e compiere un'azione.
              </p>
  
              <div className="mb-4 space-y-3">
                <div className="rounded-md bg-gold/10 p-3">
                  <h3 className="mb-1 font-semibold text-gold">Azioni in Combattimento:</h3>
                  <ul className="list-inside list-disc space-y-1 text-sm text-gray-300">
                    <li>
                      <span className="font-medium text-gold">Attacco:</span> Tira d20 + modificatore di attacco contro la
                      CA del bersaglio
                    </li>
                    <li>
                      <span className="font-medium text-gold">Lancio di Incantesimo:</span> Segui le regole specifiche
                      dell'incantesimo
                    </li>
                    <li>
                      <span className="font-medium text-gold">Disimpegno:</span> Evita attacchi di opportunità quando ti
                      allontani
                    </li>
                    <li>
                      <span className="font-medium text-gold">Scatto:</span> Raddoppia la tua velocità di movimento
                    </li>
                    <li>
                      <span className="font-medium text-gold">Aiuto:</span> Dai vantaggio a un alleato o aiutalo in un
                      compito
                    </li>
                  </ul>
                </div>
  
                <div className="rounded-md bg-gold/10 p-3">
                  <h3 className="mb-1 font-semibold text-gold">Danni e Punti Ferita:</h3>
                  <p className="text-sm text-gray-300">
                    Quando un attacco colpisce, infligge danni che riducono i punti ferita del bersaglio. Se i punti
                    ferita scendono a 0, il personaggio è incosciente e deve effettuare tiri salvezza contro la morte.
                  </p>
                </div>
              </div>
            </div>
  
            <div className="mb-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border  border-gold/20 bg-dark/80  p-6 shadow-lg shadow-gold/5">
                <div className="mb-4 flex items-center">
                  <Shield className="mr-3 h-6 w-6 text-gold" />
                  <h2 className="text-2xl text-gold">Tiri Salvezza</h2>
                </div>
                <p className="text-gray-300">
                  I tiri salvezza sono prove per resistere a effetti pericolosi. Si tirano usando d20 + modificatore della
                  caratteristica appropriata + bonus di competenza (se applicabile).
                </p>
                <div className="mt-4 rounded-md bg-gold/10 p-3">
                  <h3 className="mb-2 font-semibold text-gold">Tipi di Tiri Salvezza:</h3>
                  <ul className="list-inside list-disc space-y-1 text-sm text-gray-300">
                    <li>
                      <span className="font-medium text-gold">Forza:</span> Resistere a spinte o effetti fisici
                    </li>
                    <li>
                      <span className="font-medium text-gold">Destrezza:</span> Evitare trappole o attacchi ad area
                    </li>
                    <li>
                      <span className="font-medium text-gold">Costituzione:</span> Resistere a veleni o malattie
                    </li>
                    <li>
                      <span className="font-medium text-gold">Intelligenza:</span> Resistere a illusioni mentali
                    </li>
                    <li>
                      <span className="font-medium text-gold">Saggezza:</span> Resistere a controllo mentale
                    </li>
                    <li>
                      <span className="font-medium text-gold">Carisma:</span> Resistere a effetti di possessione
                    </li>
                  </ul>
                </div>
              </div>
  
              <div className="rounded-lg border  border-gold/20 bg-dark/80  p-6 shadow-lg shadow-gold/5">
                <div className="mb-4 flex items-center">
                  <SparklesIcon className="mr-3 h-6 w-6 text-gold" />
                  <h2 className="text-2xl text-gold">Incantesimi</h2>
                </div>
                <p className="text-gray-300">
                  Gli incantatori come maghi, chierici e stregoni possono lanciare incantesimi. Ogni classe ha accesso a
                  diversi incantesimi e utilizza un diverso attributo per lanciarli.
                </p>
                <div className="mt-4 rounded-md bg-gold/10 p-3">
                  <h3 className="mb-2 font-semibold text-gold">Componenti degli Incantesimi:</h3>
                  <ul className="list-inside list-disc space-y-1 text-sm text-gray-300">
                    <li>
                      <span className="font-medium text-gold">Verbali (V):</span> Parole o suoni specifici
                    </li>
                    <li>
                      <span className="font-medium text-gold">Somatiche (S):</span> Gesti precisi con le mani
                    </li>
                    <li>
                      <span className="font-medium text-gold">Materiali (M):</span> Oggetti specifici, talvolta consumati
                    </li>
                  </ul>
                </div>
              </div>
            </div>
  
            <div className="rounded-lg border border-gold/20 bg-dark/10 p-6 text-center">
              <h3 className="mb-2 text-xl font-semibold text-gold">Approfondimenti</h3>
              <p className="text-gray-300">
                Queste sono solo le regole base. Per una comprensione completa, consulta il Manuale del Giocatore o
                partecipa a una delle nostre sessioni introduttive.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <Link
                  to="/Guida"
                  className="rounded-md border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/20"
                >
                  Guida per Principianti
                </Link>
                <Link
                  to="/shop"
                  className="rounded-md border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/20"
                >
                  Acquista Manuali
                </Link>
                <Link
                  to="/Campaign"
                  className="rounded-md border border-gold/30 bg-gold/10 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/20"
                >
                  Unisciti a una Campagna
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div> );
}
 
export default RegoleBase;