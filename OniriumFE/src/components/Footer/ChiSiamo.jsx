import { SparklesIcon } from "@heroicons/react/24/outline";
import { Mailbox, People } from "react-bootstrap-icons";

const sections = [
    {
        title: "La Mia Storia",
        content: [
          "Mi chiamo Ninfa Carreno, e sono un’appassionata di Dungeons & Dragons, sognatrice incallita e creatrice di Onirium.",
          "Questo progetto è nato da una semplice idea: offrire uno spazio digitale dove chi ama i giochi di ruolo possa sentirsi a casa. Nel tempo libero, tra una sessione e l'altra, ho iniziato a immaginare una piattaforma pensata davvero per i giocatori semplice, intuitiva, viva.",
          "Ho curato ogni parte del progetto con dedizione, imparando, sbagliando, e migliorando passo dopo passo. Onirium è cresciuto insieme a me, ed è la prova che anche un piccolo sogno può diventare qualcosa di reale, se ci metti abbastanza cuore.",
        ],
      },
      {
        title: "La Visione",
        content: [
          "Nel mondo di oggi, spesso manca il tempo, lo spazio o il modo per sedersi attorno a un vero tavolo da gioco. Ma la voglia di vivere avventure insieme non è mai sparita.",
          "Con Onirium ho voluto creare un portale dove il gioco di ruolo non solo sopravvive, ma si evolve. Uno spazio in cui puoi gestire il tuo personaggio, seguire la tua campagna, raccontare la tua storia ovunque ti trovi.",
          "La mia visione è semplice ma profonda: portare il cuore del gioco di ruolo nel futuro, senza perdere il contatto umano, il calore dell’immaginazione condivisa e il valore della creatività personale.",
        ],
      },
      {
        title: "I Miei Valori",
        values: [
          {
            label: "Amicizia",
            description:
              "Credo che le storie più belle nascano insieme. Il gioco di ruolo è, prima di tutto, un’occasione per costruire legami, per condividere risate, sfide, emozioni. Onirium è uno spazio pensato per far incontrare persone, anche a distanza, e farle sentire parte di qualcosa di più grande.",
          },
          {
            label: "Condivisione",
            description:
              "Ogni giocatore ha qualcosa da offrire: un’idea, un personaggio, una battuta improvvisata che cambia tutto. Con Onirium voglio incoraggiare uno spirito aperto, dove contenuti e storie possano circolare, evolversi e ispirare altri. La creatività, quando è condivisa, diventa infinita.",
          },
          {
            label: "Sostenibilità",
            description:
              "Non solo rispetto per l’ambiente, ma anche per il tempo, l’energia e l’attenzione delle persone. Ho progettato Onirium per essere leggero, efficiente e accessibile a tutti, anche a chi ha pochi mezzi o poco tempo. Credo in un digitale umano, che non sostituisce ma accompagna.",
          },
          {
            label: "Libertà Creativa",
            description:
              "Nel mondo del gioco non ci sono limiti — solo possibilità. Onirium è pensato come uno strumento aperto, flessibile, che lascia spazio all’immaginazione. Che tu sia un Master navigato o un’esordiente curiosa, qui puoi costruire il tuo universo, secondo le tue regole.",
          },
        ],
      }
  ];

  
const ChiSiamo = () => {
    return ( <main className="container mx-auto px-4 py-12 text-gray-200">
        <h1 className="mb-8 text-center text-4xl font-bold text-gold">Chi Sono</h1>
  
        <div className="mx-auto max-w-3xl space-y-8">
          {sections.map((s, i) => (
            <section key={i} className="rounded-lg border border-gold/20 bg-dark/60 p-6">
              <h2 className="mb-4 text-2xl font-semibold text-gold">{s.title}</h2>
  
              {s.content &&
                s.content.map((p, i) => (
                  <p key={i} className="mb-4">
                    {p}
                  </p>
                ))}
  
              {s.values && (
                <ul className="space-y-4">
                  {s.values.map((val, i) => (
                    <li key={i}>
                      <h3 className="font-medium text-gold">{val.label}</h3>
                      <p className="text-gray-400">{val.description}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
  
          <section className="rounded-lg border border-gold/20 bg-dark/60 p-6 text-center">
            <h2 className="mb-4 text-2xl font-semibold text-gold">Contattami</h2>
            <p className="mb-4">Vuoi scrivermi o segnalare qualcosa? Ecco come trovarmi:</p>
            <div className="flex flex-col space-y-2 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
              <a
                href="mailto:info@onirium.it"
                className="inline-flex items-center justify-center rounded-md border border-gold/50 bg-dark px-4 py-2 text-sm font-medium text-gold hover:bg-gold/10"
              >
                <Mailbox className="mr-2 h-4 w-4" /> Email
              </a>              
            </div>
          </section>
        </div>
      </main> );
}
 
export default ChiSiamo;