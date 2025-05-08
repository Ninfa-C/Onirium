using Microsoft.EntityFrameworkCore;
using OniriumBE.Models.Char.Backgrounds;
using OniriumBE.Models.Char.Races;

namespace OniriumBE.Data.Seeders.Core
{
    public class SeedBackgroundPrivileges
    {
        private static BackgroundPrivilege Create(string name, string description)
        {
            return new BackgroundPrivilege
            {
                Id = Guid.NewGuid(),
                Name = name,
                Description = description,
                IsCustom = false
            };
        }

        public static async Task SeedAsync(ApplicationDbContext context)
        {
            if (await context.BackgroundPrivilege.AnyAsync()) return;

            var model = new List<BackgroundPrivilege>
            {
    Create("Ricercatore", "Nel momento in cui il Sapiente cerca di ricordare un’informazione, oppure se non la conosce affatto, spesso sa dove e da chi può ottenerla. Questa possibilità potrebbe riguardare un libro specifico, uno scriba, un’università o un altro luogo o persona in grado di fornire le conoscenze necessarie."),
    Create("Grado Militare", "Grazie alla sua carriera in ambito militare, il Soldato vede ancora riconosciuta la sua autorità in ambito militare, tanto da poter esigere ospitalità e supporto nei fortini, accampamenti e altre installazioni belliche appartenenti alla sua fazione, se presenti. Qui può ottenere rifornimenti, sebbene l’aiuto fornito non includa oggetti magici o denaro, e può anche reclutare soldati del luogo per compiere imprese semplici e non pericolose."),
    Create("Posizione Privilegiata", "Grazie alla sua fama e alla sua nobiltà, il Nobile può accedere facilmente ai circoli dell’alta società, dove viene accolto come un pari. Può ottenere udienze con altri nobili se lo desidera, e ovunque si trovi, le persone comuni si comportano in maniera riverente con lui. Inoltre, può mantenere uno stile di vita agiato (10 gp/giorno) per lui e la sua scorta."),
    Create("Tessera della Gilda", "In quanto membro rispettato di una gilda, l’Artigiano Gildato può contare sull’assistenza della propria organizzazione, che può fornirgli alloggio, supporto legale e informazioni. Può anche accedere a locali e contatti della gilda in altre città, e se necessario, ottenere aiuto per sé o per i suoi compagni, anche se ciò potrebbe richiedere favori in cambio."),
    Create("Origini Criminali", "In quanto ex criminale, il Criminale può accedere a una rete di contatti del mondo sotterraneo. Può passare messaggi e richiedere favori tramite una rete di malviventi, usata per contrabbandare beni, persone o informazioni. Tuttavia, questa rete può anche chiedere dei favori in cambio."),
    Create("Lingua Aggiuntiva", "Grazie all’educazione ricevuta o all’ambiente in cui è cresciuto, il Saggio conosce una lingua extra a sua scelta."),
    Create("Rifugio Segreto", "Il Ribelle ha accesso a una rete di simpatizzanti che può fornire rifugio, informazioni o passaggi sicuri attraverso territori ostili. Il rifugio non è sempre sicuro al 100%, ma può essere utile per nascondersi o organizzare piani."),
    Create("Approvvigionamenti", "Il Viaggiatore ha familiarità con i percorsi più efficienti, le fonti d’acqua e i luoghi sicuri per riposare in ambienti naturali. Può anche trovare il doppio del cibo durante i foraggiamenti nella natura."),
    Create("Contatti Accademici", "Il Professore mantiene contatti con colleghi accademici, studenti o bibliotecari, che possono fornire assistenza con ricerche, esperimenti o insegnamenti."),
    Create("Impronta Locale", "Il Mercante è conosciuto nelle comunità locali e può ottenere sconti o informazioni commerciali più facilmente."),
    Create("Patente di Navigazione", "Il Marinaio possiede una patente che gli permette di imbarcarsi su navi commerciali e accedere a porti, spesso con facilitazioni."),
    Create("Codice d’Onore", "Il Cavaliere segue un codice che gli garantisce rispetto e sostegno tra coloro che condividono gli stessi valori."),
    Create("Maestro d’Arte", "L’Artista è noto in alcuni ambienti culturali, dove può ottenere accesso a spettacoli, mecenati o spazi creativi."),
    Create("Sopravvissuto", "Il Ramingo ha imparato a sopravvivere in condizioni avverse. Riceve vantaggi nel seguire tracce o orientarsi."),
    Create("Legami Religiosi", "Il Chierico mantiene rapporti con templi e ordini religiosi, che possono fornire supporto spirituale, cure o alloggio."),
    Create("Contatti della Strada", "Il Vagabondo conosce altri emarginati, mendicanti e viaggiatori da cui può ottenere informazioni locali e rifugi temporanei."),
    Create("Artigianato Unico", "Il Fabbro ha una reputazione che lo precede e può ottenere commissioni o vendere le sue creazioni a prezzo pieno."),
    Create("Onore Tribale", "Il Barbaro è rispettato all’interno della propria tribù, dove può contare su supporto in beni o combattenti."),
    Create("Conoscenza Erboristica", "L’Erborista sa dove trovare erbe medicinali, velenose o curative e può preparare rimedi rudimentali."),
    Create("Passaporto Diplomatico", "Il Diplomatico può muoversi con relativa libertà in territori stranieri e ottenere udienza con figure politiche."),
    Create("Fiuto per gli Affari", "L’Impresario riconosce le opportunità di guadagno e può negoziare contratti, spettacoli o eventi a suo favore."),
    Create("Contatti Carcerari", "Il Carcerato conosce i sistemi carcerari e può ottenere informazioni o favori attraverso contatti detenuti."),
    Create("Biblioteca Portatile", "Lo Studioso porta con sé una collezione di appunti, mappe e testi utili per le sue ricerche."),
    Create("Segnalazioni", "Il Messaggero è noto per la sua affidabilità e ha punti di contatto nelle varie città."),
    Create("Testimonianze", "Il Testimone ha informazioni preziose su un evento chiave e può essere cercato o protetto da varie fazioni."),
    Create("Rete di Mercato Nero", "Lo Spacciatore ha accesso a beni proibiti, veleni, droghe o informazioni segrete."),
    Create("Sangue Reale", "Il Reietto Nobile possiede un titolo dimenticato, ma che può ancora avere un peso in certe circostanze."),
    Create("Contatti della Gilda dei Ladri", "Il Ladro è riconosciuto dalla Gilda e può ottenere protezione o accesso a oggetti rubati."),
    Create("Privilegi dell’Accademia", "Il Mago Addestrato può accedere ad archivi o risorse magiche controllate."),
    Create("Favori Politici", "L’Ambizioso ha aiutato o ricattato personalità importanti, che gli devono favori."),
    Create("Animale Messaggero", "Il Custode della Natura ha un piccolo animale che funge da messaggero o esploratore."),
    Create("Segreti di Corte", "Lo Spione conosce scandali, amanti e tradimenti che può usare come leva."),
    Create("Segreto Oscuro", "L’Incantatore Oscuro custodisce un sapere proibito che può attrarre o spaventare altri."),
    Create("Collezione Esotica", "Il Collezionista ha oggetti rari o esotici che attraggono l’interesse di collezionisti e studiosi."),
    Create("Memoria Fotografica", "Il Ricordatore può replicare con precisione testi, mappe o discorsi sentiti una sola volta."),
    Create("Addestramento Religioso", "Il Monaco ha ricevuto insegnamenti spirituali che lo rendono calmo e disciplinato anche sotto pressione."),
    Create("Maschera Sociale", "Il Doppiogiochista è esperto nel mantenere una falsa identità credibile."),
    Create("Voce del Popolo", "Il Populista può facilmente radunare folle e ottenere il sostegno delle masse."),
    Create("Protezione Divina", "Il Benedetto ha ricevuto una benedizione che gli conferisce rispetto e timore."),
    Create("Contatti del Deserto", "Il Nomade conosce carovane e rifugi nelle terre aride."),
    Create("Profezia Incompiuta", "L’Erede Profetico è legato a un’antica profezia che ancora deve compiersi."),
    Create("Retaggio Perduto", "Il Discendente ha sangue di una stirpe dimenticata, che può aprirgli porte o causargli problemi."),
    Create("Segreti Runici", "Il Runologo conosce antichi simboli e scritture magiche."),
    Create("Marchio Infernale", "Il Marchiato è legato a un patto o maledizione con esseri extraplanari."),
    Create("Custode di Reliquie", "Il Guardiano possiede o protegge un oggetto sacro o magico."),
    Create("Veggente", "Il Sognatore ha visioni profetiche che possono guidarlo o confonderlo."),
    Create("Sangue di Drago", "Il Draconide è discendente da draghi e può usare questa eredità per intimorire o affascinare."),
    Create("Linguaggio Segreto", "L’Infiltrato conosce un linguaggio segreto usato da una setta o ordine."),
    Create("Chiave Dimensionale", "Il Vagabondo Planare ha accesso a portali o conoscenze su altri piani di esistenza."),
    Create("Sogni Lucidi", "L’Oneironauta può esplorare e interagire coi sogni, ottenendo informazioni o ispirazioni."),
    Create("Dono Naturale", "Il Predestinato ha un talento innato che lo distingue e lo rende riconoscibile.")
};

            await context.BackgroundPrivilege.AddRangeAsync(model);
            await context.SaveChangesAsync();
        }
    }
}
