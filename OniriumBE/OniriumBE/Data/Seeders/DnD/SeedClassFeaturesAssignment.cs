using Microsoft.EntityFrameworkCore;
using OniriumBE.Models.Char.Classes;

namespace OniriumBE.Data.Seeders.DnD
{
    public class SeedClassFeaturesAssignment
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            if (await context.ClassFeaturesAssignments.AnyAsync()) return;

            var classFeaturesMapping = new Dictionary<string, string[]>
            {
                ["Artefice"] = new[]
    {
                    "Aumento dei Punteggi di Caratteristica",
        "Invenzione Magica",
        "Incantesimi",
        "Infondere negli Oggetti",
        "Specializzazione da Artefice",
        "Lo Strumento più Adatto",
        "Maestria negli Strumenti",
        "Lampo di Genio",
        "Adepto degli Oggetti Magici",
        "Oggetto Che Custodisce Gli Incantesimi",
        "Sapiente degli Oggetti Magici",
        "Maestro degli Oggetti Magici",
        "Anima Dell'Artificio",
    },
                ["Barbaro"] = new[]
    {
                    "Aumento dei Punteggi di Caratteristica",
                    "Attacco Extra",
        "Ira",
        "Difesa Senza Armatura",
        "Attacco Irruento",
        "Percezione del Pericolo",
        "Cammino Primordiale",
        "Movimento Veloce",
        "Istinto Ferino",
        "Critico Brutale",
        "Ira Implacabile",
        "Ira Persistente",
        "Potenza Indomabile",
        "Campione Primordiale",
    },
                ["Bardo"] = new[]
    {
                    "Aumento dei Punteggi di Caratteristica",
        "Incantesimi",
        "Ispirazione Bardica",
        "Factotum",
        "Canto di Riposo",
        "Collegio Bardico",
        "Maestria",
        "Fonte di Ispirazione",
        "Controfascino",
        "Segreti Magici",
        "Ispirazione Superiore",
    },
                ["Chierico"] = new[]
    {
                    "Aumento dei Punteggi di Caratteristica",
        "Incantesimi",
        "Dominio Divino",
        "Incanalare Divinità",
        "Imbrigliare il poter Divino (Opzionale)",
        "Trucchetti Versatili (Opzionale)",
        "Distruggere non morti(GS 1/2)",
        "Distruggere non morti(GS 1)",
        "Intervento Divino",
        "Distruggere non morti(GS 2)",
        "Distruggere non morti(GS 3)",
        "Distruggere non morti(GS 4)",
    },
                ["Druido"] = new[]
    {
                    "Aumento dei Punteggi di Caratteristica",
        "Incantesimi",
        "Druidico",
        "Forma Selvatica",
        "Circolo Druidico",
        "Compagno Selvatico (Opzionale)",
        "Trucchetti Versatili (Opzionale)",
        "Corpo Senza Tempo",
        "Incantesimi Bestiali",
        "Arcidruido",
    },
                ["Guerriero"] = new[]
    {
                    "Aumento dei Punteggi di Caratteristica",
                    "Attacco Extra",
        "Stile di Combattimento",
        "Recupero Energie",
        "Azione Impetuosa",
        "Archetipo Marziale",
        "Versatilità Marziale (Opzionale)",
        "Indomito"
    },
                ["Monaco"] = new[]
    {
                    "Aumento dei Punteggi di Caratteristica",
                    "Attacco Extra",
        "Difesa Senza Armatura",
        "Arti Marziali",
        "Ki",
        "Movimento Senza Armatura",
        "Arma Dedicata (Opzionale)",
        "Tradizione Monastica",
        "Deviare Proiettili",
        "Attacco Infuso di Ki (Opzionale)",
        "Caduta Lenta",
        "Guarigione Accelerata (Opzionale)",
        "Colpo Stordente",
        "Mira Focalizzata (Opzionale))",
        "Colpi di Ki Potenziati",
        "Elusione",
        "Mente Lucida",
        "Purezza del Corpo",
        "Lingua del Sole e della Luna",
        "Anima Adamantina",
        "Corpo Senza Tempo",
        "Corpo Vuoto",
        "Perfezione Interiore",
    },
                ["Mago"] = new[]
    {
                    "Aumento dei Punteggi di Caratteristica",
        "Incantesimi",
        "Recupero Arcano",
        "Tradizione Arcana",
        "Formule dei Trucchetti",
        "Maestria negli Incantesimi",
        "Incantesimi Personali",
    },
                ["Ladro"] = new[]
{
    "Aumento dei Punteggi di Caratteristica",
    "Maestria",
    "Attacco Furtivo",
    "Gergo dei Ladri",
    "Azione Scaltra",
    "Archetipo Ladresco",
    "Mira Stabile (Opzionale)",
    "Schivata Prodigiosa",
    "Evasione",
    "Dote Affidabile",
    "Percezione Cieca",
    "Mente Sfuggente",
    "Inafferrabile",
    "Colpo di Fortuna",
},

                ["Paladino"] = new[]
{
    "Aumento dei Punteggi di Caratteristica",
    "Percezione del Divino",
    "Imposizione delle Mani",
    "Stile di Combattimento",
    "Incantesimi Divini",
    "Punizione Divina",
    "Salute Divina",
    "Giuramento Sacro",
    "Imbrigliare il Potere Divino (Opzionale)",
    "Versatilità Marziale (Opzionale)",
    "Attacco Extra",
    "Aura di Protezione",
    "Aura di Coraggio",
    "Punizione Divina Migliorata",
    "Tocco Purificatore",
},

                ["Ranger"] = new[]
{
    "Aumento dei Punteggi di Caratteristica",
    "Nemico Prescelto",
    "Avversario Prescelto (Opzionale)",
    "Esploratore Nato",
    "Esploratore Esperto (Opzionale)",
    "Stile di Combattimento",
    "Incantesimi",
    "Consapevolezza Primordiale",
    "Attacco Extra",
    "Andatura sul Territorio",
    "Nascondersi in piena vista",
    "Svanire",
    "Sensi Ferini",
    "Sterminatore di Nemici",
},

                ["Stregone"] = new[]
{
    "Aumento dei Punteggi di Caratteristica",
    "Incantesimi",
    "Origine Stregonesca",
    "Fonte di Magia",
    "Metamagia",
    "Stregoneria Versatile (Opzionale)",
    "Guida Magica (Opzionale)",
    "Ripristino Stregonesco",
},

                ["Warlock"] = new[]
{
    "Aumento dei Punteggi di Caratteristica",
    "Patrono Ultraterreno",
    "Magia del Patto",
    "Suppliche Occulte",
    "Dono del Patto",
    "Versatilità Occulta (Opzionale)",
    "Arcanum Mistico",
    "Maestro dell'Occulto",
},

            };

            foreach (var (className, featureNames) in classFeaturesMapping)
            {
                var classEntity = await context.Classes
                    .FirstOrDefaultAsync(c => c.Name == className && !c.IsCustom);

                if (classEntity == null)
                {
                    Console.WriteLine($"Classe non trovata: {className}");
                    continue;
                }

                foreach (var featureName in featureNames)
                {
                    var feature = await context.ClassFeatures
                        .FirstOrDefaultAsync(f => f.Name == featureName && !f.IsCustom);

                    if (feature == null)
                    {
                        Console.WriteLine($"Feature non trovata: {featureName}");
                        continue;
                    }

                    var exists = await context.ClassFeaturesAssignments.AnyAsync(a =>
                        a.ClassId == classEntity.Id && a.TraitId == feature.Id);

                    if (!exists)
                    {
                        context.ClassFeaturesAssignments.Add(new ClassFeaturesAssignmente
                        {
                            Id = Guid.NewGuid(),
                            ClassId = classEntity.Id,
                            SubclassId = null,
                            TraitId = feature.Id
                        });
                    }
                }
            }

            var subclassFeaturesMapping = new Dictionary<(string subclassName, string parentClassName), string[]>
            {

                [("Patto del Signore Fatato", "Warlock")] = new[]
{
    "Presenza Fatata",
    "Fuga Velata",
    "Difese Seducenti",
    "Delirio Oscuro",
},

                [("Patto del Celestiale", "Warlock")] = new[]
{
    "Trucchetti Bonus",
    "Luce Guaritrice",
    "Anima Radiosa",
    "Resistenza Celestiale",
    "Vendetta Incandescente",
},

                [("Patto della Lama del Sortilegio", "Warlock")] = new[]
{
    "Maledizione della Lama del Sortilegio",
    "Combattente del Sortilegio",
    "Spettro Maledetto",
    "Armatura dei Sortilegi",
    "Maestro dei Sortilegi",
},

                [("Patto dell'Insondabile", "Warlock")] = new[]
{
    "Tentacolo delle Profondità",
    "Dono del Mare",
    "Anima Oceanica",
    "Spirale Guardiana",
    "Presa dei Tentacoli",
    "Immersione Insondabile",
},

                [("Patto del Grande Antico", "Warlock")] = new[]
{
    "Mente Risvegliata",
    "Interdizione Entropica",
    "Scudo del Pensiero",
    "Creare Servitore",
},

                [("Patto dell'Immondo", "Warlock")] = new[]
{
    "Benedizione dell'Oscuro",
    "Fortuna dell'Oscuro",
    "Resilienza Immonda",
    "Scagliare all'Inferno",
},

                [("Patto del Genio", "Warlock")] = new[]
{
    "Recipiente del Genio",
    "Dono Elementale",
    "Santuario del Recipiente",
    "Desiderio Limitato",
},

                [("Discendenza Draconica", "Stregone")] = new[]
{
    "Antenato Draconico",
    "Resilienza Draconica",
    "Affinità Elementale",
    "Ali di Drago",
    "Presenza Draconica",
},

                [("Magia Selvaggia", "Stregone")] = new[]
{
    "Impulso di Magia Selvaggia",
    "Onde di Caos",
    "Piegare la Fortuna",
    "Caos Controllato",
    "Bombardamento Magico",
},

                [("Magia delle Ombre", "Stregone")] = new[]
{
    "Peculiarità dello Stregone delle Ombre",
    "Occhi dell'Oscuro",
    "Forza della Tomba",
    "Segugio dei Presagi Nefasti",
    "Camminare nelle Ombre",
    "Forma d'Ombra",
},

                [("Anima Divina", "Stregone")] = new[]
{
    "Magia Divina",
    "Prescelto dagli Dei",
    "Guarigione Potenziata",
    "Ali Ultraterrene",
    "Recupero Ultraterreno",
},

                [("Stregoneria della Tempesta", "Stregone")] = new[]
{
    "Portavoce del Vento",
    "Magia Tempestosa",
    "Cuore della Tempesta",
    "Guida della Tempesta",
    "Furia della Tempesta",
    "Anima del Vento",
},

                [("Mente Aberrante", "Stregone")] = new[]
{
    "Incantesimi Psionici",
    "Conversazione Telepatica",
    "Stregoneria Psionica",
    "Difese Psichiche",
    "Rivelazione della Carne",
    "Implosione Distorcente",
},

                [("Anima Meccanica", "Stregone")] = new[]
{
    "Magia Meccanica",
    "Ripristino dell'Equilibrio",
    "Bastione della Legge",
    "Trance dell'Ordine",
    "Cavalleria Meccanica",
},

                [("Cacciatore", "Ranger")] = new[]
{
    "Preda del Cacciatore",
    "Tattiche Difensive",
    "Multiattacco",
    "Difesa del Cacciatore Superiore",
},

                [("Signore delle Bestie", "Ranger")] = new[]
{
    "Compagno del Ranger",
    "Compagno Primordiale (Opzionale)",
    "Addestramento Straordinario",
    "Furia Bestiale",
    "Condividere Incantesimi",
},

                [("Viandante Fatato", "Ranger")] = new[]
{
    "Colpi Terribili",
    "Magia del Viandante Fatato",
    "Fascino Ultraterreno",
    "Scambio Seducente",
    "Rinforzi Fatati",
    "Viandante Velato",
},

                [("Custode degli Sciami", "Ranger")] = new[]
{
    "Sciame Riunito",
    "Magia del Custode degli Sciami",
    "Marea Avvolgente",
    "Sciame Possente",
    "Dispersione Brulicante",
},

                [("Cacciatore delle Tenebre", "Ranger")] = new[]
{
    "Magia del Cacciatore delle Tenebre",
    "Imboscata Terrificante",
    "Vista dell'Ombra",
    "Mente di Ferro",
    "Raffica del Cacciatore",
    "Schivata dell'Ombra",
},

                [("Viandante dell'Orizzonte", "Ranger")] = new[]
{
    "Magia del Viandante dell'Orizzonte",
    "Individuazione dei Portali",
    "Combattente Planare",
    "Passo Etereo",
    "Colpo Distante",
    "Difesa Spettrale",
},

                [("Uccisore di Mostri", "Ranger")] = new[]
{
    "Magia dell'Uccisore di Mostri",
    "Percezione del Cacciatore",
    "Preda dell'Uccisore",
    "Difesa Soprannaturale",
    "Nemesi degli Incantatori",
    "Contrattacco dell'Uccisore",
},

                [("Giuramento degli Antichi", "Paladino")] = new[]
{
    "Dettami degli Antichi",
    "Incantesimi del Giuramento",
    "Incanalare Divinità",
    "Aura di Interdizione",
    "Sentinella Imperitura",
    "Campione degli Antichi",
},

                [("Giuramento della Devozione", "Paladino")] = new[]
{
    "Dettami di Devozione",
    "Incantesimi del Giuramento",
    "Incanalare Divinità",
    "Aura di Devozione",
    "Purezza di Spirito",
    "Nimbo Sacro",
},

                [("Giuramento della Vendetta", "Paladino")] = new[]
{
    "Dettami di Vendetta",
    "Incantesimi del Giuramento",
    "Incanalare Divinità",
    "Giuramento della Vendetta",
    "Vendicatore Implacabile",
    "Anima di Vendetta",
    "Angelo Vendicatore",
},

                [("Giuramento della Conquista", "Paladino")] = new[]
{
    "Dettami di Conquista",
    "Incantesimi del Giuramento",
    "Incanalare Divinità",
    "Aura di Conquista",
    "Intimorire Sprezzante",
    "Conquistatore Invincibile",
},

                [("Giuramento della Gloria", "Paladino")] = new[]
{
    "Dettami di Gloria",
    "Incantesimi del Giuramento",
    "Incanalare Divinità",
    "Aura di Alacrità",
    "Difesa Gloriosa",
    "Leggenda Vivente",
},

                [("Giuramento della Redenzione", "Paladino")] = new[]
{
    "Dettami di Redenzione",
    "Incantesimi del Giuramento",
    "Incanalare Divinità",
    "Aura del Guardiano",
    "Spirito Protettivo",
    "Emissario di Redenzione",
},

                [("Giuramento dell'Apostata", "Paladino")] = new[]
{
    "Fede Negata",
    "Incantesimi dell'Apostata",
    "Incanalare Divinità",
    "Aura di Odio",
    "Resistenza Soprannaturale",
    "Abisso Incontenibile",
    "Signore del Terrore",
},

                [("Giuramento delle Sentinelle", "Paladino")] = new[]
{
    "Dettami delle Sentinelle",
    "Incantesimi del Giuramento",
    "Incanalare Divinità",
    "Aura della Sentinella",
    "Punizione Solerte",
    "Baluardo dei Mortali",
},

                [("Furfante", "Ladro")] = new[]
{
    "Aumento dei Punteggi di Caratteristica",
    "Mani Veloci",
    "Lavoro al Secondo Piano",
    "Furtività Suprema",
    "Usare Oggetto Magico",
    "Riflessi da Furfante",
},

                [("Assassino", "Ladro")] = new[]
{
    "Competenze Bonus",
    "Assassinare",
    "Maestro Infiltrato",
    "Impostore",
    "Colpo Mortale",
},

                [("Mistificatore Arcano", "Ladro")] = new[]
{
    "Lancio di Incantesimi",
    "Gioco di Prestigio della Mano Magica",
    "Imboscata Magica",
    "Ingannatore Versatile",
    "Ladro di Incantesimi",
},

                [("Indagatore", "Ladro")] = new[]
{
    "Orecchio per l'Inganno",
    "Occhio per i Dettagli",
    "Combattimento Intuitivo",
    "Occhio di Lince",
    "Occhio Infallibile",
    "Individuare il Punto Debole",
},

                [("Esploratore", "Ladro")] = new[]
{
    "Schermagliatore",
    "Survivalista",
    "Mobilità Superiore",
    "Maestro di Imboscate",
    "Colpo Improvviso",
},

                [("Pianificatore", "Ladro")] = new[]
{
    "Maestro degli Intrighi",
    "Maestro di Tattiche",
    "Manipolatore Intuitivo",
    "Fuorviare",
    "Anima Ingannevole",
},

                [("Spadaccino", "Ladro")] = new[]
{
    "Gioco di Gambe",
    "Audacia del Fanfarone",
    "Spavalderia",
    "Manovra Elegante",
    "Maestro Duellante",
},

                [("Fantasma", "Ladro")] = new[]
{
    "Sussurri dei Morti",
    "Lamenti dalla Tomba",
    "Pegni dei Defunti",
    "Cammino Fantasma",
    "Compagno della Morte",
},

                [("Lama Spirituale", "Ladro")] = new[]
{
    "Potere Psionico",
    "Lame Psichiche",
    "Lame dell'Anima",
    "Velo Psichico",
    "Mente Lacerata",
},
                [("Alchimista", "Artefice")] = new[]
    {
        "Competenza negli strumenti",
        "Incantesimi da alchimista",
        "Elisir sperimentale",
        "Alchemico Sapiente",
        "Reagenti Ristorativi",
        "Maestria nella chimica",
    },
                [("Armaiolo", "Artefice")] = new[]
    {
        "Strumenti del Mestiere",
        "Incantesimi da armaiolo",
        "Armatura Arcana",
        "Modello di Armatura",
        "Attacco Extra",
        "Modifiche all'Armatura",
        "Armatura Perfezionata",
        "Scossa Arcana",
        "Difensore Migliorato",
    },
                [("Artigliere", "Artefice")] = new[]
    {
        "Competenza negli strumenti",
        "Incantesimi da artigliere",
        "Cannone Occulto",
        "Arma da fuoco arcana",
        "Cannone Esplosivo",
        "Posizione Fortificata",
    },
                [("Fabbro da battaglia", "Artefice")] = new[]
    {
        "Competenza negli strumenti",
        "Incantesimi da fabbro da battaglia",
        "Pronto per la Battaglia",
        "Difensore d'Acciaio",
    },
                [("Cammino del Berserker", "Barbaro")] = new[]
    {
        "Frenesia",
        "Frenesia Insensata",
        "Presenza Intimidatoria",
        "Ritorsione",
    },
                [("Cammino del combattente totemico", "Barbaro")] = new[]
    {
        "Cercatore di Spiriti",
        "Spirito Totemico",
        "Aspetto della Bestia",
        "Viandante Spirituale",
        "Sintonizzazione Totemica",
    },
                [("Cammino del guardiano ancestrale", "Barbaro")] = new[]
    {
        "Protettori Ancestrali",
        "Scudo Spirituale",
        "Consultare gli Spiriti",
        "Antenati Vendicativi",
    },
                [("Cammino dell'araldo della tempesta", "Barbaro")] = new[]
    {
        "Aura di Tempesta",
        "Anima della Tempesta",
        "Tempesta Protettiva",
        "Tempesta Furiosa",
    },
                [("Cammino dello Zelota", "Barbaro")] = new[]
    {
        "Furia Divina",
        "Guerriero degli Dei",
        "Focus Fanatico",
        "Presenza Zelante",
        "Ira Oltre la Morte",
    },
                [("Cammino della Bestia", "Barbaro")] = new[]
    {
        "Forma della Bestia",
        "Anima Bestiale",
        "Furia Infettiva",
        "Chiamata alla Caccia",
    },
                [("Cammino della Magia Selvatica", "Barbaro")] = new[]
    {
        "Consapevolezza Magica",
        "Impeto Selvaggio",
        "Magia Potenziante",
        "Contracco Instabile",
        "Impulso Controllato",
    },
                [("Collegio del fascino", "Bardo")] = new[]
    {
        "Manto d'Ispirazione",
        "Esibizione Estasiante",
        "Manto di Maestà",
        "Maestà Inviolabile",
    },
                [("Collegio della sapienza", "Bardo")] = new[]
    {
        "Competenze Bonus",
        "Parole Taglienti",
        "Segreti Magici Aggiuntivi",
        "Abilità Impareggiabile",
    },
                [("Collegio del valore", "Bardo")] = new[]
    {
        "Competenze Bonus",
        "Ispirazione in Combattimento",
        "Attacco Extra",
        "Magia da Battaglia",
    },
                [("Collegio dei sussurri", "Bardo")] = new[]
    {
        "Lame Psichiche",
        "Parole del Terrore",
        "Manto dei Sussurri",
        "Sapienza delle Ombre",
    },
                [("Collegio dell'eloquenza", "Bardo")] = new[]
    {
        "Lingua d'Argento",
        "Parole Inquietanti",
        "Ispirazione Infallibile",
        "Favella Universale",
        "Ispirazione Contagiosa",
    },
                [("Collegio della creazione", "Bardo")] = new[]
    {
        "Granulo di Potenziale",
        "Esecuzione della Creazione",
        "Animare una Performance",
        "Crescendo Creativo",
    },
                [("Collegio della spada", "Bardo")] = new[]
    {
        "Competenze Bonus",
        "Stile di Combattimento",
        "Attacco Extra",
        "Fiore della Maestra",
    },
                [("Dominio della Morte", "Chierico")] = new[]
    {
        "Incantesimi del Dominio della Morte",
        "Competenza Bonus",
        "Mietitore",
        "Incanalare divinità: Tocco della Morte",
        "Distruzione Inevitabile",
        "Colpo Divino",
        "Mietitore Migliorato",
    },
                [("Dominio della Forgia", "Chierico")] = new[]
    {
        "Incantesimi del Dominio della Forgia",
        "Competenza Bonus",
        "Benedizione della Forgia",
        "Incanalare Divinità: Benedizione dell'Artigiano",
        "Anima della Forgia",
        "Colpo Divino",
        "Santo della Forgia e del Fuoco",
    },
                [("Dominio della Tomba", "Chierico")] = new[]
    {
        "Incantesimi del Dominio della Tomba",
        "Cerchio di Mortalità",
        "Occhi della Tomba",
        "Incanalare Divinità: Verso la Tomba",
        "Sentinella alla Porta della Morte",
        "Incantesimi Potenti",
        "Custode delle Anime",
    },
                [("Dominio della Conoscenza", "Chierico")] = new[]
    {
        "Incantesimi del Dominio della Conoscenza",
        "Benedizione della Conoscenza",
        "Incanalare Divinità: Conoscenze Secolari",
        "Incanalare Divinità: Lettura del Pensiero",
        "Incantesimi Potenti",
        "Visioni del Passato",
    },
                [("Dominio della Vita", "Chierico")] = new[]
    {
        "Incantesimi del Dominio della Vita",
        "Competenza Bonus",
        "Discepolo della Vita",
        "Incanalare Divinità: Preservare Vita",
        "Guaritore Benedetto",
        "Colpo Divino",
        "Guarigione Suprema",
    },
                [("Dominio della Luce", "Chierico")] = new[]
    {
        "Incantesimi del Dominio della Luce",
        "Trucchetto Bonus",
        "Lampo di Interdizione",
        "Incanalare Divinità: Fulgore dell'Alba",
        "Lampo Migliorato",
        "Incantesimi Potenti",
        "Corona di Luce",
    },
                [("Dominio della Natura", "Chierico")] = new[]
    {
        "Incantesimi del Dominio della Natura",
        "Acolito della Natura",
        "Competenza Bonus",
        "Incanalare Divinità: Charme su Animali e Vegetali",
        "Attenuare gli Elementi",
        "Colpo Divino",
        "Maestro della Natura",
    },
                [("Dominio dell'Ordine", "Chierico")] = new[]
    {
        "Incantesimi del Dominio dell'Ordine",
        "Competenze Bonus",
        "Voce dell'Autorità",
        "Incanalare Divinità: Pretesa dell'Ordine",
        "Incarnazione della Legge",
        "Colpo Divino",
        "Ira dell'Ordine",
    },
                [("Dominio della Pace", "Chierico")] = new[]
    {
        "Incantesimi del Dominio della Pace",
        "Strumento di Pace",
        "Legame Incoraggiante",
        "Incanalare Divinità: Balsamo di Pace",
        "Legame Protettivo",
        "Incantesimi Potenziati",
        "Legame Espansivo",
    },
                [("Dominio della Tempesta", "Chierico")] = new[]
    {
        "Incantesimi del Dominio della Tempesta",
        "Competenze Bonus",
        "Collera della Tempesta",
        "Incanalare Divinità: Collera Distruttiva",
        "Colpo del Tuono e del Fulmine",
        "Colpo Divino",
        "Nato dalla Tempesta",
    },
                [("Dominio dell'Inganno", "Chierico")] = new[]
    {
        "Incantesimi del Dominio dell'Inganno",
        "Benedizione dell'Ingannatore",
        "Incanalare Divinità: Invocare Duplicato",
        "Incanalare Divinità: Manto di Ombre",
        "Colpo Divino",
        "Duplicato Migliorato",
    },
                [("Dominio del Crepuscolo", "Chierico")] = new[]
    {
        "Incantesimi del Dominio del Crepuscolo",
        "Benedizione del Crepuscolo",
        "Competenze Bonus",
        "Occhi della Notte",
        "Benedizione Vigile",
        "Incanalare Divinità: Santuario del Crepuscolo",
        "Passi della Notte",
        "Colpo Divino",
        "Sudario del Crepuscolo",
    },
                [("Dominio della Guerra", "Chierico")] = new[]
    {
        "Incantesimi del Dominio della Guerra",
        "Benedizione della Guerra",
        "Competenza Bonus",
        "Sacerdote di Guerra",
        "Incanalare Divinità: Colpo Guidato",
        "Incanalare Divinità: Benedizione del Dio della Guerra",
        "Colpo Divino",
        "Avatar della Battaglia",
    },
                [("Circolo dei Sogni", "Druido")] = new[]
    {
        "Balsamo della Corte dell'Estate",
        "Focolare della Luce Lunare e dell'Ombra",
        "Sentieri Nascosti",
        "Viandante dei Sogni",
    },
                [("Circolo della Terra", "Druido")] = new[]
    {
        "Trucchetto Bonus",
        "Recupero Naturale",
        "Incantesimi del Circolo",
        "Andatura sul Territorio",
        "Interdizione della Natura",
        "Rifugio della Natura",
    },
                [("Circolo della Luna", "Druido")] = new[]
    {
        "Forma Selvatica da Combattimento",
        "Forme del Circolo",
        "Colpo Primordiale",
        "Forma Selvatica Elementale",
        "Mille Forme",
    },
                [("Circolo del Pastore", "Druido")] = new[]
    {
        "Lingua dei Boschi",
        "Totem Spirituale",
        "Evocatore Possente",
        "Spirito Guardiano",
        "Evocazioni Fedeli",
    },
                [("Circolo delle Spore", "Druido")] = new[]
    {
        "Incantesimi del Circolo",
        "Alone di Spore",
        "Entità Simbiotica",
        "Infestazione Fungina",
        "Diffusione di Spore",
        "Corpo Fungino",
    },
                [("Circolo delle Stelle", "Druido")] = new[]
    {
        "Carta Celeste",
        "Forma Siderale",
        "Profezia Cosmica",
        "Costellazioni Scintillanti",
        "Manto di Stelle",
    },
                [("Circolo della Fiamma", "Druido")] = new[]
    {
        "Incantesimi del Circolo",
        "Evocare Spirito della Fiamma",
        "Legame Migliorato",
        "Fiamme Cauterizzanti",
        "Recupero Ardente",
    },
                [("Campione", "Guerriero")] = new[]
    {
        "Critico Migliorato",
        "Atleta Straordinario",
        "Stile di Combattimento Extra",
        "Critico Superiore",
        "Sopravvissuto",
    },
                [("Maestro di Battaglia", "Guerriero")] = new[]
    {
        "Superiorità in Combattimento",
        "Studioso di Guerra",
        "Conosci il Tuo Nemico",
        "Superiorità di Combattimento Migliorata",
        "Implacabile",
    },
                [("Cavaliere Mistico", "Guerriero")] = new[]
    {
        "Incantesimi",
        "Arma Vincolata",
        "Magia da Guerra",
        "Colpo Mistico",
        "Carica Arcana",
        "Magia da Guerra Migliorata",
    },
                [("Arciere Arcano", "Guerriero")] = new[]
    {
        "Conoscenze Dell'Arciere Arcano",
        "Tiro Arcano",
        "Freccia Magica",
        "Tiro Curvo",
        "Tiro Sempre Pronto",
    },
                [("Cavaliere Errante", "Guerriero")] = new[]
    {
        "Competenza Bonus",
        "Nato in Sella",
        "Marchio Incrollabile",
        "Manovra Protettrice",
        "Mantenere la Posizione",
        "Carica Feroce",
        "Difensore Vigile",
    },
                [("Guerriero Psionico", "Guerriero")] = new[]
    {
        "Potere Psionico",
        "Adepto Telecinetico",
        "Scudo Mentale",
        "Baluardo della Forza",
        "Maestro della Telecinesi",
    },
                [("Guerriero Runico", "Guerriero")] = new[]
    {
        "Competenze Bonus",
        "Intagliatore di Rune",
        "Potenza del Gigante",
        "Scudo Runico",
        "Statura Torreggiante",
        "Maestro delle Rune",
        "Colosso Runico",
    },
                [("Samurai", "Guerriero")] = new[]
    {
        "Competenza Bonus",
        "Spirito Comb attivo",
        "Cortigiano Elegante",
        "Spirito Instancabile",
        "Colpo Rapido",
        "Forza di fronte alla Morte",
    },
                [("Via del sè astrale", "Monaco")] = new[]
    {
        "Braccia del Sé Astrale",
        "Volto del Sé Astrale",
        "Corpo del Sé Astrale",
        "Sé Astrale Risvegliato",
    },
                [("Via del Maestro Ubriaco", "Monaco")] = new[]
    {
        "Competenze Bonus",
        "Tecnica dell'Ubriaco",
        "Andatura Ondeggiante",
        "Fortuna dell'Ubriacone",
        "Frenesia Intossicata",
    },
                [("via dei Quattro elementi", "Monaco")] = new[]
    {
        "Discepolo degli Elementi",
        "Discipline Elementali",
    },
                [("Via del Kensei", "Monaco")] = new[]
    {
        "Cammino del Kensei",
        "Tutt'uno con la Lama",
        "Affilare la Lama",
        "Precisione Infallibile",
    },
                [("Via della Misericordia", "Monaco")] = new[]
    {
        "Strumenti di Misericordia",
        "Mano Guaritrice",
        "Mano del Dolore",
        "Tocco del Medico",
        "Raffica di Guarigione e Dolore",
        "Mano della Misericordia Suprema",
    },
                [("Via della Mano Aperta", "Monaco")] = new[]
    {
        "Tecnica della Mano Aperta",
        "Integrità del Corpo",
        "Tranquillità",
        "Palmo Tremante",
    },
                [("Via dell'Ombra", "Monaco")] = new[]
    {
        "Arti delle Ombre",
        "Passo dell'Ombra",
        "Manto di Ombre",
        "Opportunista",
    },
                [("Via dell'Anima Solare", "Monaco")] = new[]
    {
        "Dardo del Sole Radioso",
        "Colpo dell'Onda Incandescente",
        "Esplosione Solare Incandescente",
        "Scudo Solare",
    },
                [("Scuola dell'Abiurazione", "Mago")] = new[]
    {
        "Abiuratore Sapiente",
        "Interdizione Arcana",
        "Interdizione Proiettata",
        "Abiurazione Migliorata",
        "Resistenza agli Incantesimi",
    },
                [("Scuola dell'Ammaliamento", "Mago")] = new[]
    {
        "Ammaliatore Sapiente",
        "Sguardo Ipnotico",
        "Fascino Istintivo",
        "Ammaliamento Condiviso",
        "Alterare Ricordi",
    },
                [("Scuola della Divinazione", "Mago")] = new[]
    {
        "Divinatore Sapiente",
        "Portento",
        "Divinazione Esperta",
        "Terzo Occhio",
        "Portento Superiore",
    },
                [("Scuola dell'Evocazione", "Mago")] = new[]
    {
        "Evocatore Sapiente",
        "Evocazione Minore",
        "Trasposizione Benevola",
        "Evocazione Focalizzata",
        "Evocazioni Perduranti",
    },
                [("Scuola dell'Illusione", "Mago")] = new[]
    {
        "Illusionista Sapiente",
        "Illusione Minore Migliorata",
        "Illusioni Duttili",
        "Sosia Illusorio",
        "Realtà Illusoria",
    },
                [("Scuola dell'Invocazione", "Mago")] = new[]
    {
        "Invocatore Sapiente",
        "Plasmare Incantesimi",
        "Trucchetto Potente",
        "Invocazione Potente",
        "Saturazione Magica",
    },
                [("Scuola della Necromanzia", "Mago")] = new[]
    {
        "Necromante Sapiente",
        "Raccolto Macabro",
        "Servitori Non Morti",
        "Impervio alla Non Morte",
        "Comandare Non Morti",
    },
                [("Scuola della Trasmutazione", "Mago")] = new[]
    {
        "Trasmutatore Sapiente",
        "Alchimia Minore",
        "Pietra del Trasmutatore",
        "Mutaforma",
        "Maestro Trasmutatore",
    },
                [("Ordine degli Scribi", "Mago")] = new[]
    {
        "Calamo Magico",
        "Libro degli Incantesimi Risvegliato",
        "Mente Manifestata",
        "Scrivano Arcano",
        "Comunione con il Testo",
    },
                [("Cantore della Lama", "Mago")] = new[]
    {
        "Arte della Guerra e del Canto",
        "Melodia della Lama",
        "Attacco Extra",
        "Canto di Difesa",
        "Canto di Vittoria",
    },
                [("Magia della Guerra", "Mago")] = new[]
    {
        "Deviazione Arcana",
        "Ingegno Tattico",
        "Impulso di Potere",
        "Magia Durevole",
        "Sudario di Deviazione",
    },
            };
            foreach (var ((subclassName, parentClassName), featureNames) in subclassFeaturesMapping)
            {
                var subclassEntity = await context.Subclasses
                    .Include(s => s.Class)
                    .FirstOrDefaultAsync(s => s.Name == subclassName && s.Class.Name == parentClassName);

                if (subclassEntity == null) continue;

                foreach (var featureName in featureNames)
                {
                    var feature = await context.ClassFeatures
                        .FirstOrDefaultAsync(f => f.Name == featureName && !f.IsCustom);

                    if (feature == null) continue;

                    var exists = await context.ClassFeaturesAssignments.AnyAsync(a =>
                        a.SubclassId == subclassEntity.Id && a.TraitId == feature.Id);

                    if (!exists)
                    {
                        context.ClassFeaturesAssignments.Add(new ClassFeaturesAssignmente
                        {
                            Id = Guid.NewGuid(),
                            ClassId = null,
                            SubclassId = subclassEntity.Id,
                            TraitId = feature.Id
                        });
                    }
                }
            }



            await context.SaveChangesAsync();
        }
    }
}
