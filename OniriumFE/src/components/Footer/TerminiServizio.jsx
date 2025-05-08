import { ScaleIcon } from "@heroicons/react/24/outline";
import { FileText, Shield } from "react-bootstrap-icons";

const termsData = [
  {
    title: "Accettazione dei Termini",
    content: [
      "Utilizzando il nostro servizio, l'utente accetta di essere vincolato da questi Termini di Servizio. Se non si accettano tutti i termini e le condizioni, l'utente non è autorizzato a utilizzare il servizio.",
    ],
  },
  {
    title: "Descrizione del Servizio",
    content: [
      "Onirium fornisce una piattaforma online per la gestione di campagne di giochi di ruolo, la creazione di personaggi, la condivisione di contenuti e l'acquisto di prodotti digitali e fisici relativi ai giochi di ruolo.",
    ],
  },
  {
    title: "Account Utente",
    content: [
      "Per utilizzare alcune funzionalità del servizio, è necessario creare un account. L'utente è responsabile della riservatezza delle proprie credenziali e delle attività sul proprio account.",
      "Ci riserviamo il diritto di sospendere o terminare un account in caso di violazioni o comportamenti dannosi.",
    ],
  },
  {
    title: "Contenuti Utente",
    content: [
      "Gli utenti possono pubblicare contenuti garantendo di avere i diritti per farlo.",
      "Concedono a Onirium una licenza globale, non esclusiva e gratuita per l’uso dei contenuti in relazione al servizio.",
    ],
  },
  {
    title: "Contenuti Proibiti",
    content: [
      "Non è consentito pubblicare contenuti illegali, offensivi, osceni o inappropriati. Ci riserviamo il diritto di rimuoverli.",
    ],
  },
  {
    title: "Proprietà Intellettuale",
    content: [
      "Il servizio e i suoi contenuti originali sono proprietà di Onirium e protetti da leggi sul copyright e altri diritti.",
      "Dungeons & Dragons e altri marchi sono dei rispettivi proprietari; non vi è affiliazione ufficiale.",
    ],
  },
  {
    title: "Limitazione di Responsabilità",
    content: [
      "Onirium non è responsabile per danni indiretti o consequenziali derivanti da:",
    ],
    list: [
      "L'uso o l'impossibilità di utilizzare il servizio",
      "Accessi non autorizzati o alterazioni dei dati",
      "Dichiarazioni o comportamenti di terzi",
      "Altre questioni relative al servizio",
    ],
  },
  {
    title: "Modifiche ai Termini",
    content: [
      "Ci riserviamo il diritto di modificare questi Termini in qualsiasi momento.",
      "Le modifiche sostanziali saranno notificate via email o sul sito.",
    ],
  },
  {
    title: "Legge Applicabile",
    content: [
      "Questi Termini sono regolati dalle leggi italiane, senza riguardo ai conflitti di legge.",
    ],
  },
  {
    title: "Contatti",
    content: [
      'Per domande, scrivi a <a href="mailto:legal@onirium.it" class="text-gold underline">legal@onirium.it</a>.',
    ],
  },
];

const TerminiServizio = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-darker via-dark-lighter to-gold/10 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <ScaleIcon className="h-10 w-10 text-gold" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gold mb-2">
            Termini di Servizio
          </h1>
          <p className="text-xl text-gray-400">
            Ultimo aggiornamento: 15 Aprile 2025
          </p>
        </div>

        <div className="mx-auto max-w-3xl rounded-lg border border-gold/20 bg-dark/60 p-6 shadow-lg shadow-gold/5">
          <div className="mb-8 flex items-center justify-center gap-4 border-b border-gold/10 pb-4 text-sm">
            <Shield className="h-5 w-5 text-gold" />
            <p className="text-center text-gray-400">
              Ti preghiamo di leggere attentamente questi Termini di Servizio
              prima di utilizzare la piattaforma Onirium.
            </p>
            <FileText className="h-5 w-5 text-gold" />
          </div>

          <div className="space-y-8 text-sm leading-relaxed">
            {termsData.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl text-gold font-semibold mb-2">
                  {`${i + 1}. ${section.title}`}
                </h2>
                {/* dato che ho un mail to non posso mettere il paragrafo normalmente ma uso dangerouslyInnerHtml! */}
                {section.content.map((paragraph, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
                {section.list && (
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    {section.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-gold/20 bg-gold/5 p-4 text-center">
            <p className="text-sm text-gray-300">
              Utilizzando il nostro servizio, accetti di essere vincolato da
              questi Termini. Se non li accetti, non sei autorizzato a
              utilizzare la piattaforma.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminiServizio;
