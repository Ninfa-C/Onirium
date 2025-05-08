using Microsoft.EntityFrameworkCore;
using OniriumBE.Models.Items;
using OniriumBE.Models.Char;
using OniriumBE.Models.AttackSpells;

namespace OniriumBE.Data.Seeders.ItemsSeeders
{
    public class SeedItems
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            if (await context.Items.AnyAsync()) return;

            var stats = await GetStats(context);
            var cat = await GetCategory(context);

            var model = new List<Items>
            {
                CreateGenericItem("Abaco", "", 1m, 200, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Abito, Comune", "", 1.5m, 50, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Abito, Costume", "", 2m, 500, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Abito, da Viaggiatore", "", 2m, 200, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Abito, Pregiato", "", 3m, 1500, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Acciarino e pietra focaia", "", 0.5m, 50, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Acido (fiala)", "", 0.5m, 2500, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Acqua Santa (ampolla)", "", 0.5m, 2500, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Ampolla o boccale", "", 0.5m, 2, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Anello con Sigillo", "", 0m, 500, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Antitossina (fiala)", "", 0m, 5000, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Ariete portatile", "", 17.5m, 400, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Asta (3 metri)", "", 3.5m, 5, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Attrezzi da scalatore", "", 6m, 2500, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Barile", "", 35m, 200, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Bilancia da mercante", "", 1.5m, 500, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Borsa", "", 0.5m, 50, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Borsa del guaritore", "", 1.5m, 500, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Borsa per Componenti", "", 1m, 2500, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Bottiglia di Vetro", "", 1m, 200, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Brocca o caraffa", "", 2m, 2, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Campanella", "", 0m, 100, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Candela", "", 0m, 1, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Canestro", "", 1m, 40, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Canna da pesca", "", 2m, 100, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Cannocchiale", "", 0.5m, 100000, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Carrucola e paranco", "", 2.5m, 100, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Carta (un foglio)", "", 0m, 20, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Catena (3 metri)", "", 5m, 500, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Cera per sigillo", "", 0m, 50, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Chiodo da Rocciatore", "", 0.125m, 5, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Clessidra", "", 0.5m, 2500, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Coperta", "", 1.5m, 50, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Corda di Canapa (15 metri)", "", 5m, 100, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Corda di Seta (15 metri)", "", 2.5m, 1000, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Cote per Affilare", "", 0.5m, 1, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Custodia per Mappe o Pergamene", "", 0.5m, 100, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Custodia per quadrelli da balestra", "", 0.5m, 100, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Faretra", "", 0.5m, 100, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Fiala", "", 0m, 100, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Fischietto da Richiamo", "", 0m, 5, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Focus arcano - Bacchetta", "", 0.5m, 1000, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Focus arcano - Bastone", "", 2m, 500, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Focus arcano - Cristallo", "", 0.5m, 1000, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Focus arcano - Globo", "", 1.5m, 2000, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Focus arcano - Verga", "", 1m, 1000, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Focus druidico - Bacchetta in legno di tasso", "", 0.5m, 1000, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Focus druidico - Bastone di legno", "", 2m, 500, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Focus druidico - Rametto di vischio", "", 0m, 100, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Focus druidico - Totem", "", 0m, 100, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Forziere", "", 12.5m, 500, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Fuoco dell'alchimista (ampolla)", "", 0.5m, 5000, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Gavetta", "", 0.5m, 2, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Gessetto (1 pezzo)", "", 0m, 1, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Giaciglio", "", 3.5m, 100, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Inchiostro (boccetta da 30 grammi)", "", 0m, 1000, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Lampada", "", 0.5m, 50, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Lanterna a Lente Sporgente", "", 1m, 1000, cat["Oggetti da Utilizzo"], false),
                CreateGenericItem("Lanterna Schermabile", "", 1m, 500, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Lente d'ingrandimento", "", 0m, 10000, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Libro", "", 2.5m, 2500, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Libro degli Incantesimi", "", 1.5m, 5000, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Manette", "", 3m, 200, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Martello", "", 1.5m, 100, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Martello da demolitore", "", 5m, 200, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Aghi da cerbottana (50)", "", 0.5m, 100, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Frecce (20)", "", 0.5m, 100, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Proiettili da fionda (20)", "", 0.75m, 40, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Quadrelli da balestra (20)", "", 0.75m, 100, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Olio (ampolla)", "", 0.5m, 10, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Otre", "", 2.5m, 20, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Pennino", "", 0m, 20, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Pentola di ferro", "", 5m, 200, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Pergamena (un foglio)", "", 0m, 10, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Piccone da Minatore", "", 5m, 200, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Piede di porco", "", 2.5m, 200, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Pozione di guarigione", "", 0.25m, 5000, cat["Pozione"], false),
CreateGenericItem("Profumo (fiala)", "", 0m, 500, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Rampino", "", 2m, 200, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Razioni (1 giornata)", "", 1m, 50, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Sacco", "", 0.25m, 1, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Sapone", "", 0m, 20, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Scala a pioli (3 metri)", "", 12.5m, 10, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Secchio", "", 1m, 5, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Serratura", "", 0.5m, 1000, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Sfere Metalliche (sacchetto da 1.000)", "", 1m, 100, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Simbolo sacro - Amuleto", "", 0.5m, 500, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Simbolo sacro - Emblema", "", 0m, 500, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Simbolo sacro - Reliquiario", "", 1m, 500, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Specchio di Metallo", "", 0.25m, 500, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Spuntoni di Ferro (10)", "", 2.5m, 100, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Tagliola", "", 12.5m, 500, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Tenda per due persone", "", 10m, 200, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Torcia", "", 0.5m, 1, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Triboli (sacchetto da 20)", "", 1m, 100, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Vanga o Badile", "", 2.5m, 200, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Veleno base (fiala)", "", 0m, 10000, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Veste", "", 2m, 100, cat["Oggetti da Utilizzo"], false),
CreateGenericItem("Zaino", "", 2.5m, 200, cat["Oggetti da Utilizzo"], false),


                CreateGenericItem("Arnesi da scasso", "Utilizzati per forzare serrature.", 0.5m, 2500, cat["Strumento"], false),
                CreateGenericItem("Borsa da erborista", "Contiene strumenti per la raccolta e lavorazione delle erbe.", 1.5m, 500, cat["Strumento"], false),
                CreateGenericItem("Dadi", "Set di dadi da gioco.", 0m, 10, cat["Strumento"], false),
                CreateGenericItem("Mazzo di carte", "Mazzo di carte per giochi d'azzardo o passatempo.", 0m, 50, cat["Strumento"], false),
                CreateGenericItem("Sostanze da avvelenatore", "Strumenti e reagenti per la creazione di veleni.", 1m, 5000, cat["Strumento"], false),
                CreateGenericItem("Arnesi da falsario", "Utilizzati per falsificare documenti.", 2.5m, 1500, cat["Strumento"], false),
                CreateGenericItem("Scorte da alchimista", "Strumenti base per esperimenti e creazioni alchemiche.", 4m, 5000, cat["Strumento"], false),
                CreateGenericItem("Scorte da birraio", "Utilizzati per la produzione di birra e simili.", 4.5m, 2000, cat["Strumento"], false),
                CreateGenericItem("Scorte da calligrafo", "Contiene penne, inchiostro e strumenti per la scrittura raffinata.", 2.5m, 1000, cat["Strumento"], false),
                CreateGenericItem("Strumenti da calzolaio", "Utilizzati per la riparazione e creazione di calzature.", 2.5m, 500, cat["Strumento"], false),
                CreateGenericItem("Strumenti da cartografo", "Strumenti per disegnare mappe con precisione.", 3m, 1500, cat["Strumento"], false),
                CreateGenericItem("Strumenti da conciatore", "Utilizzati nella lavorazione della pelle.", 2.5m, 500, cat["Strumento"], false),
                CreateGenericItem("Strumenti da fabbro", "Set base per la lavorazione dei metalli.", 4m, 2000, cat["Strumento"], false),
                CreateGenericItem("Strumenti da falegname", "Strumenti per costruire e riparare strutture in legno.", 3m, 800, cat["Strumento"], false),
                CreateGenericItem("Strumenti da gioielliere", "Strumenti di precisione per lavorare gemme e metalli preziosi.", 1m, 2500, cat["Strumento"], false),
                CreateGenericItem("Strumenti da intagliatore", "Utilizzati per scolpire legno e pietra.", 2.5m, 100, cat["Strumento"], false),
                CreateGenericItem("Strumenti da inventore", "Kit per creare piccoli dispositivi meccanici.", 5m, 5000, cat["Strumento"], false),
                CreateGenericItem("Strumenti da muratore", "Strumenti per la costruzione con pietra e mattoni.", 4m, 1000, cat["Strumento"], false),
                CreateGenericItem("Strumenti da pittore", "Pennelli, pigmenti e tela per dipingere.", 2.5m, 1000, cat["Strumento"], false),
                CreateGenericItem("Strumenti da soffiatore", "Utilizzati per lavorare il vetro.", 2.5m, 3000, cat["Strumento"], false),
                CreateGenericItem("Strumenti da tessitore", "Telaio portatile e altri strumenti per la tessitura.", 2.5m, 100, cat["Strumento"], false),
                CreateGenericItem("Strumenti da vasaio", "Utilizzati per modellare e cuocere ceramica.", 1.5m, 1000, cat["Strumento"], false),
                CreateGenericItem("Trucchi per il camuffamento", "Kit per travestimenti e trucco.", 1.5m, 2500, cat["Strumento"], false),
                CreateGenericItem("Utensili da cuoco", "Pentole, coltelli e altri strumenti per cucinare.", 4m, 100, cat["Strumento"], false),
                CreateGenericItem("Strumenti da navigatore", "Bussola, sestante e altri strumenti di navigazione.", 1m, 2500, cat["Strumento"], false),
                CreateGenericItem("Ciaramella", "Strumento a fiato popolare.", 0.5m, 200, cat["Strumento"], false),
                CreateGenericItem("Cornamusa", "Strumento musicale ad aria.", 3m, 3000, cat["Strumento"], false),
                CreateGenericItem("Corno", "Strumento musicale a fiato.", 1m, 300, cat["Strumento"], false),
                CreateGenericItem("Dulcimer", "Strumento a corde suonato con martelletti.", 5m, 2500, cat["Strumento"], false),

                CreateArmor("Imbottita", "Armatura leggera in tessuto imbottito.", 4m, 5, cat["Armatura"], false, 11,"Leggera", true, null),
                CreateArmor("Cuoio", "Armatura leggera in cuoio lavorato.", 5m, 10, cat["Armatura"], false, 11,"Leggera", false, null),
                CreateArmor("Cuoio borchiato", "Armatura leggera rinforzata con borchie.", 6.5m, 45, cat["Armatura"], false, 12,"Leggera", false, null),
                CreateArmor("Pelle", "Armatura media fatta di pelli trattate.", 6m, 10, cat["Armatura"], false, 12,"Media", false, null),
                CreateArmor("Giaco di maglia", "Armatura media con anelli metallici.", 10m, 50, cat["Armatura"], false, 13,"Media", false, null),
                CreateArmor("Corazza di piastre", "Placche metalliche sovrapposte.", 10m, 400, cat["Armatura"], false, 14,"Media", false, null),
                CreateArmor("Mezza armatura", "Armatura media per busto e spalle.", 20m, 750, cat["Armatura"], false, 15,"Media", true, null),
                CreateArmor("Corazza ad anelli", "Armatura pesante in anelli su cuoio.", 20m, 30, cat["Armatura"], false, 14,"Pesante", true, null),
                CreateArmor("Cotta di maglia", "Maglia metallica, richiede forza.", 27.5m, 75, cat["Armatura"], false, 16,"Pesante", true, new List<ItemRequirement> {
                CreateRequirement(stats["Forza"], 13, "Forza") }),
                CreateArmor("Corazza a strisce", "Piastre e strisce di metallo.", 30m, 200, cat["Armatura"], false, 17,"Pesante", true, new List<ItemRequirement> {
                CreateRequirement(stats["Forza"], 15, "Forza") }),
                CreateArmor("Armatura a piastre", "Protezione completa.", 32.5m, 1500, cat["Armatura"], false, 18,"Pesante", true, new List<ItemRequirement> {
                CreateRequirement(stats["Forza"], 15, "Forza") }),
                CreateArmor("Scudo", "Scudo che aumenta la classe armatura.", 3m, 10, cat["Armatura"], false, 2,"Scudo", false, null),
                CreateWeapon("Ascia", "Ascia da battaglia. Proprietà: Lancio (gittata 6/18), Leggera", 1m, 5, cat["Arma"], false, await CreateDamageList(context, "1d6", "taglienti")),
                CreateWeapon("Bastone ferrato", "Versatile (1d8)", 2m, 2, cat["Arma"], false, await CreateDamageList(context, "1d6", "contundenti")),
                CreateWeapon("Falcetto", "Leggera", 1m, 1, cat["Arma"], false, await CreateDamageList(context, "1d4", "taglienti")),
                CreateWeapon("Giavellotto", "Lancio (gittata 9/36)", 1m, 5, cat["Arma"], false, await CreateDamageList(context, "1d6", "perforanti")),
                CreateWeapon("Lancia", "Lancio (gittata 6/18), Versatile (1d8)", 1.5m, 1, cat["Arma"], false, await CreateDamageList(context, "1d6", "perforanti")),
                CreateWeapon("Martello leggero", "Lancio (gittata 6/18), Leggera", 1m, 2, cat["Arma"], false, await CreateDamageList(context, "1d4", "contundenti")),
                CreateWeapon("Mazza", "", 2m, 5, cat["Arma"], false, await CreateDamageList(context, "1d6", "contundenti")),
                CreateWeapon("Pugnale", "Accurata, Lancio (gittata 6/18), Leggera", 0.5m, 2, cat["Arma"], false, await CreateDamageList(context, "1d4", "perforanti")),
                CreateWeapon("Randello", "Leggera", 1m, 1, cat["Arma"], false, await CreateDamageList(context, "1d4", "contundenti")),
                CreateWeapon("Randello pesante", "Due mani", 5m, 2, cat["Arma"], false, await CreateDamageList(context, "1d8", "contundenti")),
                CreateWeapon("Arco corto", "Due mani, Munizioni (gittata 24/96)", 1m, 25, cat["Arma"], false, await CreateDamageList(context, "1d6", "perforanti")),
                CreateWeapon("Balestra leggera", "Due mani, Munizioni (gittata 24/96), Ricarica", 2.5m, 25, cat["Arma"], false, await CreateDamageList(context, "1d8", "perforanti")),
                CreateWeapon("Dardo", "Accurata, Lancio (gittata 6/18)", 0.125m, 5, cat["Arma"], false, await CreateDamageList(context, "1d4", "perforanti")),
                CreateWeapon("Fionda", "Munizioni (gittata 9/36)", 0m, 1, cat["Arma"], false, await CreateDamageList(context, "1d4", "contundenti")),
                CreateWeapon("Alabarda", "Due mani, Pesante, Portata", 3m, 20, cat["Arma"], false, await CreateDamageList(context, "1d10", "taglienti")),
                CreateWeapon("Ascia bipenne", "Due mani, Pesante", 3.5m, 30, cat["Arma"], false, await CreateDamageList(context, "1d12", "taglienti")),
                CreateWeapon("Ascia da battaglia", "Versatile (1d10)", 2m, 10, cat["Arma"], false, await CreateDamageList(context, "1d8", "taglienti")),
                CreateWeapon("Falcione", "Due mani, Pesante, Portata", 3m, 20, cat["Arma"], false, await CreateDamageList(context, "1d10", "taglienti")),
                CreateWeapon("Frusta", "Accurata, Portata", 1.5m, 2, cat["Arma"], false, await CreateDamageList(context, "1d4", "taglienti")),
                CreateWeapon("Lancia da cavaliere", "Portata, Speciale", 3m, 10, cat["Arma"], false, await CreateDamageList(context, "1d12", "perforanti")),
                CreateWeapon("Maglio", "Due mani, Pesante", 5m, 10, cat["Arma"], false, await CreateDamageList(context, "2d6", "contundenti")),
                CreateWeapon("Martello da guerra", "Versatile (1d10)", 1m, 15, cat["Arma"], false, await CreateDamageList(context, "1d8", "contundenti")),
                CreateWeapon("Mazza chiodata", "", 2m, 15, cat["Arma"], false, await CreateDamageList(context, "1d8", "perforanti")),
                CreateWeapon("Mazzafrusto", "", 1m, 10, cat["Arma"], false, await CreateDamageList(context, "1d8", "contundenti")),
                CreateWeapon("Picca", "Due mani, Pesante, Portata", 9m, 5, cat["Arma"], false, await CreateDamageList(context, "1d10", "perforanti")),
                CreateWeapon("Piccone da guerra", "", 1m, 5, cat["Arma"], false, await CreateDamageList(context, "1d8", "perforanti")),
                CreateWeapon("Scimitarra", "Accurata, Leggera", 1.5m, 25, cat["Arma"], false, await CreateDamageList(context, "1d6", "taglienti")),
                CreateWeapon("Spada corta", "Accurata, Leggera", 1m, 10, cat["Arma"], false, await CreateDamageList(context, "1d6", "perforanti")),
                CreateWeapon("Spada lunga", "Versatile (1d10)", 1.5m, 15, cat["Arma"], false, await CreateDamageList(context, "1d8", "taglienti")),
                CreateWeapon("Spadone", "Due mani, Pesante", 3m, 50, cat["Arma"], false, await CreateDamageList(context, "2d6", "taglienti")),
                CreateWeapon("Stocco", "Accurata", 1m, 25, cat["Arma"], false, await CreateDamageList(context, "1d8", "perforanti")),
                CreateWeapon("Tridente", "Lancio (gittata 6/18), Versatile (1d8)", 2m, 5, cat["Arma"], false, await CreateDamageList(context, "1d6", "perforanti")),
                CreateWeapon("Arco lungo", "Due mani, Munizioni (gittata 45/180), Pesante", 1m, 50, cat["Arma"], false, await CreateDamageList(context, "1d8", "perforanti")),
                CreateWeapon("Balestra a mano", "Leggera, Munizioni (gittata 9/36), Ricarica", 1.5m, 75, cat["Arma"], false, await CreateDamageList(context, "1d6", "perforanti")),
                CreateWeapon("Balestra pesante", "Due mani, Munizioni (gittata 30/120), Pesante, Ricarica", 9m, 50, cat["Arma"], false, await CreateDamageList(context, "1d10", "perforanti")),
                CreateWeapon("Cerbottana", "Munizioni (gittata 7,5/30), Ricarica", 0.5m, 10, cat["Arma"], false, await CreateDamageList(context, "1", "perforanti")),
                CreateWeapon("Rete", "Lancio (gittata 1,5/4,5), Speciale", 1.5m, 1, cat["Arma"], false, new List<ItemDamage>()),
                CreatePotion("Pozione di cura", "Ripristina 2d4 + 2 punti ferita.", 0.5m, 50, cat["Pozione"], true, new List<ItemEffect>
                {
                    CreateEffect("Guarigione", "Cura una quantità di punti ferita.", 2, null)
                }),
                CreatePotion("Pozione di forza del gigante", "Incrementa temporaneamente la forza.", 0.5m, 150, cat["Pozione"], true, new List<ItemEffect>
                {
                    CreateEffect("Buff", "Aumenta Forza di 5 punti per 1 ora.", 5, stats["Forza"])
                }),
                CreateMagicalItem("Mantello dell'invisibilità", "Rende invisibili per brevi periodi.", 1m, 3000, cat["Oggetto Magico"], true, "Leggendario", true, new List<ItemEffect>
                {
                    CreateEffect("Invisibilità", "Rende invisibili per 1 minuto.", 0, null)
                }),
                CreateMagicalItem("Anello di protezione", "Aumenta la CA e i tiri salvezza.", 0.1m, 1200, cat["Oggetto Magico"], true, "Raro", true, new List<ItemEffect>
                {
                    CreateEffect("Difesa", "+1 alla CA.", 1, null),
                    CreateEffect("Tiri Salvezza", "+1 ai tiri salvezza.", 1,null)
                })
            };

            if (await context.Items.CountAsync() >= model.Count)
            {
                return;
            }
            context.ItemRequirements.RemoveRange(context.ItemRequirements);
            context.ItemDamages.RemoveRange(context.ItemDamages);
            context.ItemEffects.RemoveRange(context.ItemEffects);
            context.Items.RemoveRange(context.Items);

            await context.Items.AddRangeAsync(model);
            await context.SaveChangesAsync();
        }

        private static Items CreateGenericItem(string name, string description, decimal weight, int value, int categoryId, bool isMagical)
        {
            return new Items
            {
                Id = Guid.NewGuid(),
                Name = name,
                Description = description,
                Weight = weight,
                Value = value,
                ItemCategoryId = categoryId,
                IsMagical = isMagical,
                CreatedAt = DateTime.UtcNow
            };
        }
        private static Armor CreateArmor(string name, string description, decimal weight, int value, int categoryId, bool isMagical, int armorClass, string type, bool hasDisadvantage, List<ItemRequirement>? requirements)
        {
            return new Armor
            {
                Id = Guid.NewGuid(),
                Name = name,
                Description = description,
                Weight = weight,
                Value = value,
                ItemCategoryId = categoryId,
                IsMagical = isMagical,
                CreatedAt = DateTime.UtcNow,
                ArmorType = type,
                ArmorClass = armorClass,
                HasDisadvantageOnStealth = hasDisadvantage,
                Requirements = requirements ?? new List<ItemRequirement>()
            };
        }

        private static Weapon CreateWeapon(string name, string description, decimal weight, int value, int categoryId, bool isMagical, List<ItemDamage> damages)
        {
            return new Weapon
            {
                Id = Guid.NewGuid(),
                Name = name,
                Description = description,
                Weight = weight,
                Value = value,
                ItemCategoryId = categoryId,
                IsMagical = isMagical,
                CreatedAt = DateTime.UtcNow,
                Damages = damages
            };
        }

        private static Potion CreatePotion(string name, string description, decimal weight, int value, int categoryId, bool isMagical, List<ItemEffect> effects)
        {
            return new Potion
            {
                Id = Guid.NewGuid(),
                Name = name,
                Description = description,
                Weight = weight,
                Value = value,
                ItemCategoryId = categoryId,
                IsMagical = isMagical,
                CreatedAt = DateTime.UtcNow,
                Effects = effects
            };
        }

        private static MagicalItem CreateMagicalItem(string name, string description, decimal weight, int value, int categoryId, bool isMagical, string rarity, bool requiresAttunement, List<ItemEffect> effects)
        {
            return new MagicalItem
            {
                Id = Guid.NewGuid(),
                Name = name,
                Description = description,
                Weight = weight,
                Value = value,
                ItemCategoryId = categoryId,
                IsMagical = isMagical,
                CreatedAt = DateTime.UtcNow,
                Rarity = rarity,
                RequiresAttunement = requiresAttunement,
                Effects = effects
            };
        }
        private static ItemRequirement CreateRequirement(Guid statId, int minValue, string statName)
        {
            return new ItemRequirement
            {
                Id = Guid.NewGuid(),
                StatId = statId,
                MinimumValue = minValue
            };
        }
        private static async Task<Dictionary<string, Guid>> GetStats(ApplicationDbContext context)
        {
            var stats = await context.Stats.ToListAsync();
            return stats.ToDictionary(s => s.Name, s => s.Id);
        }

        private static async Task<Dictionary<string, int>> GetCategory(ApplicationDbContext context)
        {
            var cats = await context.ItemCategories.ToListAsync();
            return cats.ToDictionary(c => c.Name, c => c.Id);
        }
        private static async Task<List<ItemDamage>> CreateDamageList(ApplicationDbContext context, string dice, string type)
        {
            var damage = await CreateDamage(context, dice, type);
            return new List<ItemDamage> {
                new ItemDamage {
                    Id = Guid.NewGuid(),
                    Damage = damage
                }
            };
        }
        private static async Task<Damage> CreateDamage(ApplicationDbContext context, string dice, string type)
        {
            var existing = await context.Damages.FirstOrDefaultAsync(d => d.DamageDice == dice && d.DamageType == type);
            if (existing != null) return existing;

            var newDamage = new Damage
            {
                Id = Guid.NewGuid(),
                DamageDice = dice,
                DamageType = type
            };
            await context.Damages.AddAsync(newDamage);
            return newDamage;
        }

        private static ItemEffect CreateEffect(string effectType, string description, int value, Guid? stat)
        {
            return new ItemEffect
            {
                Id = Guid.NewGuid(),
                EffectType = effectType,
                Description = description,
                AffectedStat = stat,
                Value = value,
                IsCustom = false
            };
        }

    }
}