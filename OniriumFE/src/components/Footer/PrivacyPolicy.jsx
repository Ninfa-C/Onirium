import { Eye, Lock, Shield } from "react-bootstrap-icons";

const PrivacyPolicy = () => {
    return (
      <div className="min-h-screen bg-gradient-to-b from-dark-darker via-dark-lighter to-gold/10 text-gray-300">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-4 flex justify-center">
                <Lock className="h-10 w-10 text-gold" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gold mb-2">Privacy Policy</h1>
            <p className="text-xl text-gray-400">Ultimo aggiornamento: 7 Maggio 2025</p>
          </div>
  
          {/* Contenuto */}
          <div className="mx-auto max-w-3xl rounded-lg border border-gold/20 bg-dark/60 p-6 shadow-lg shadow-gold/5">
            <div className="mb-6 flex items-center justify-center gap-4 border-b border-gold/10 pb-4 text-sm">
              <Eye className="h-5 w-5 text-gold" />
              <p className="text-center text-gray-400">
                La tua privacy è importante. Questa informativa descrive come trattiamo i tuoi dati.
              </p>
              <Shield className="h-5 w-5 text-gold" />
            </div>
  
            <div className="space-y-6 text-sm leading-relaxed">
              <div>
                <h2 className="text-xl text-gold mb-1">1. Informazioni che Raccogliamo</h2>
                <ul className="list-disc pl-5">
                  <li>Nome, email.</li>
                  <li>Interazione con la piattaforma e contenuti creati.</li>
                  <li>Informazioni tecniche (IP, browser, dispositivo).</li>
                </ul>
              </div>
  
              <div>
                <h2 className="text-xl text-gold mb-1">2. Come Utilizziamo i Dati</h2>
                <ul className="list-disc pl-5">
                  <li>Per offrire e migliorare i nostri servizi.</li>
                  <li>Analisi statistiche e personalizzazione dell’esperienza.</li>
                </ul>
              </div>
  
              <div>
                <h2 className="text-xl text-gold mb-1">3. Condivisione delle Informazioni</h2>
                <p>Condividiamo dati solo con:</p>
                <ul className="list-disc pl-5">
                  <li>Altri utenti (per contenuti pubblici).</li>
                  <li>Autorità competenti, se richiesto.</li>
                </ul>
              </div>
  
              <div>
                <h2 className="text-xl text-gold mb-1">4. Cookie e Tracciamento</h2>
                <p>Utilizziamo cookie per migliorare l’esperienza utente. Puoi gestirli nelle impostazioni del browser.</p>
              </div>
  
              <div>
                <h2 className="text-xl text-gold mb-1">5. Sicurezza</h2>
                <p>Adottiamo misure per proteggere i tuoi dati. Tuttavia, nessun sistema è sicuro al 100%.</p>
              </div>
  
              <div>
                <h2 className="text-xl text-gold mb-1">6. Conservazione</h2>
                <p>I tuoi dati sono conservati solo per il tempo necessario o secondo obblighi di legge.</p>
              </div>
  
              <div>
                <h2 className="text-xl text-gold mb-1">7. I Tuoi Diritti</h2>
                <ul className="list-disc pl-5">
                  <li>Accedere e correggere i tuoi dati</li>
                  <li>Cancellazione o limitazione del trattamento</li>
                  <li>Trasferibilità dei dati e revoca del consenso</li>
                </ul>
                <p className="mt-2">
                  Per esercitarli, scrivi a <a href="mailto:privacy@onirium.it" className="text-gold underline">privacy@onirium.it</a>.
                </p>
              </div>
  
              <div>
                <h2 className="text-xl text-gold mb-1">8. Minori</h2>
                <p>Non raccogliamo dati da minori di 16 anni. Se sei un genitore e hai dubbi, contattaci.</p>
              </div>
  
              <div>
                <h2 className="text-xl text-gold mb-1">9. Modifiche</h2>
                <p>Possiamo aggiornare questa policy. Ti informeremo tramite la piattaforma o email.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default PrivacyPolicy;