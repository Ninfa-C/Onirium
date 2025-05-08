import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown, QuestionCircle } from "react-bootstrap-icons";

const faqItems = [
  {
    question: "Cos'è Dungeons & Dragons?",
    answer:
      "Dungeons & Dragons (D&D) è un gioco di ruolo fantasy creato da Gary Gygax e Dave Arneson...",
  },
  {
    question: "Come posso iniziare a giocare a D&D?",
    answer:
      "Per iniziare, puoi acquistare il Set Base o scaricare le regole gratuite dal sito ufficiale...",
  },
  {
    question: "Cosa serve per giocare a D&D?",
    answer:
      "Per giocare avrai bisogno del manuale base, una scheda del personaggio, dadi poliedrici...",
  },
  {
    question: "Quanto dura una sessione di D&D?",
    answer:
      "Una sessione tipica dura dalle 3 alle 5 ore, ma può variare in base al gruppo...",
  },
  {
    question: "Posso giocare a D&D online?",
    answer:
      "Con un po' di pazienza anche questa funzione verrà implementata nel nostro sito! per adesso organizza le tue sessioni senza aver pausa di dimenticare la scheda a casa perchè è a portata di un click!",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-darker via-dark-lighter to-gold/10">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <QuestionCircle className="h-10 w-10 text-gold" />
          </div>
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-gold">
            Domande Frequenti
          </h1>
          <p className="text-xl text-gray-400">
            Risposte alle domande più comuni su D&D e la nostra piattaforma
          </p>
        </div>

        <div className="mx-auto max-w-3xl rounded-lg border border-gold/20 bg-dark/80 p-6 shadow-lg shadow-gold/5">
          <Accordion.Root type="multiple" className="space-y-2">
            {faqItems.map((item, i) => (
              <Accordion.Item
                key={i}
                value={`item-${i}`}
                className="border-b border-gold/10"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between py-4 text-left text-gold text-lg font-medium transition hover:text-gold/90">
                    {item.question}
                    <ChevronDown className="ml-2 h-5 w-5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="pb-4 text-gray-300 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown">
                  {item.answer}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>

          <div className="mt-8 rounded-lg border border-gold/20 bg-gold/5 p-4 text-center">
            <h3 className="mb-2 text-xl font-semibold text-gold">
              Hai altre domande?
            </h3>
            <p className="text-gray-300">
              Non hai trovato la risposta che cercavi? Contattaci e saremo
              felici di aiutarti.
            </p>
            <a
              href="/supporto"
              className="mt-4 inline-block rounded-md border border-gold/30 bg-gold/10 px-6 py-2 font-medium text-gold transition-colors hover:bg-gold/20"
            >
              Contatta il Supporto
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
