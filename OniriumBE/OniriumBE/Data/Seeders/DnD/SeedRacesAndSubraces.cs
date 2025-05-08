using Microsoft.EntityFrameworkCore;
using OniriumBE.Models.Char.Classes;
using OniriumBE.Models.Char.Races;

namespace OniriumBE.Data.Seeders.DnD
{
    public class SeedRacesAndSubraces
    {
        private static Race Create(string name, string description)
        {
            return new Race
            {
                Id = Guid.NewGuid(),
                Name = name,
                Description = description,
                IsCustom = false
            };
        }
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            if (await context.Classes.AnyAsync()) return;

            var model = new List<Race>
            {
               Create("Umano","Gli umani sono versatili e adattabili, eccellendo in qualsiasi campo scelgano. Sono la razza più diffusa e prosperano grazie alla loro ingegnosità e determinazione."),
               Create ("Elfo",  "Agili e longevi, gli elfi sono esseri legati alla magia e alla natura. Hanno una grande affinità con l’arte, la musica e la bellezza, ma anche un forte senso di indipendenza."),
               Create("Nano", "Robustezza e determinazione contraddistinguono i nani. Vivono a lungo e sono rinomati per la loro maestria nella lavorazione dei metalli e per la loro incrollabile lealtà."),
               Create("Halfling",  "Piccoli e agili, gli halfling sono noti per la loro gioia di vivere e la loro capacità di cavarsela in ogni situazione. Amano il cibo, la compagnia e l’avventura."),
               Create("Mezzelfo",  "Un mix tra l’eredità umana e quella elfica, i mezzelfi sono carismatici e indipendenti. Spesso lottano per trovare il loro posto nel mondo, ma eccellono nella diplomazia e nell’adattabilità."),
               Create("Mezzorco","Discendenti di umani e orchi, i mezzorchi sono forti e resistenti. Spesso visti con diffidenza, si distinguono per la loro determinazione e il desiderio di dimostrare il proprio valore." ),
               Create("Draconide", "Con le loro scaglie e l’aspetto draconico, i draconidi portano il sangue dei draghi nelle vene. Sono fieri guerrieri e hanno un forte senso dell'onore e della tradizione."),
               Create("Tiefling", "Discendenti di esseri infernali, i tiefling possiedono tratti demoniaci e un’aura di mistero. Spesso evitati dagli altri, compensano con astuzia, fascino e una volontà incrollabile." ),
               Create("Gnomo", "Piccoli ma pieni di energia, gli gnomi sono intelligenti e curiosi. Sono inventori, maghi e burloni, con una passione per la conoscenza e il divertimento." ),
               Create("Changeling", "Creature mutaforma in grado di cambiare aspetto a piacimento, i changeling sono sfuggenti e misteriosi. Vivono adattandosi all’ambiente e agli altri, spesso trovando il loro posto tra gli inganni e la diplomazia." ),
               Create("Aasimar", "Portatori della luce celestiale, gli aasimar discendono da esseri divini. Sono guidati da un senso di giustizia e compassione, con una connessione innata al sacro."),
               Create("Goliath", "Grandi e possenti, i goliath vivono nelle montagne e seguono una cultura di forza e merito. Ogni impresa per loro è una sfida da superare, e il loro spirito competitivo è senza pari." )
            };
            await context.Races.AddRangeAsync(model);
            await context.SaveChangesAsync();

            var subraces = new List<Subrace>();
            var associations = new Dictionary<string, string[]>
            {
                ["Elfo"] = ["Alto Elfo", "Elfo dei Boschi", "Elfo Oscuro"],
                ["Nano"] = ["Nano delle Colline", "Nano delle Montagne"],
                ["Halfling"] = ["Halfling piedelesto", "Halfling tozzo"],
                ["Tiefling"] = ["Tiefling Infernale", "Tiefling Abissale"],
                ["Gnomo"] = ["Gnomo delle rocce", "Gnomo delle Foreste"],
                ["Aasimar"] = ["Aasimar protettore", "Aasimar flagellatore", "Aasimar caduto"],
                ["Umano"] = ["Comune", "Variante"]
            };

            foreach (var (racE, subRace) in associations)
            {
                var item = model.FirstOrDefault(b => b.Name == racE);

                foreach (var element in subRace)
                {
                    subraces.Add(new Subrace
                    {
                        Id = Guid.NewGuid(),
                        Name = element,
                        RaceId = item!.Id,
                        IsCustom = false,

                    });
                }
            }
            await context.Subraces.AddRangeAsync(subraces);
            await context.SaveChangesAsync();

        }
    }
}
