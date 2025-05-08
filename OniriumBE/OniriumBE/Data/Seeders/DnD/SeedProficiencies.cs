using Microsoft.EntityFrameworkCore;
using OniriumBE.Models.Char.Classes;

namespace OniriumBE.Data.Seeders.DnD
{
    public class SeedProficiencies
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {

            if (await context.Proficiencies.AnyAsync()) return;
            //context.Proficiencies.RemoveRange(await context.Proficiencies.ToListAsync());
            //await context.SaveChangesAsync();            

            var model = new List<Proficiency>
            {
                // 1
                new() { Type = ProficiencyType.Armature, Description = "Armature leggere, armature medie, scudi" },
                new() { Type = ProficiencyType.Armi, Description = "Armi semplici, armi da guerra" },
                new() { Type = ProficiencyType.Strumenti, Description = "Nessuno" },
                new() { Type = ProficiencyType.TiriSalvezza, Description = "Forza, Costituzione" },
                new() { Type = ProficiencyType.Abilità, Description = "Due a scelta tra Addestrare Animali, Atletica, Intimidire, Natura, Percezione e Sopravvivenza" },

                // 2
                new() { Type = ProficiencyType.Armature, Description = "Armature leggere" },
                new() { Type = ProficiencyType.Armi, Description = "Armi semplici, balestre a mano, spade corte, spade lunghe, stocchi" },
                new() { Type = ProficiencyType.Strumenti, Description = "Tre strumenti musicali a scelta del bardo" },
                new() { Type = ProficiencyType.TiriSalvezza, Description = "Destrezza, Carisma" },
                new() { Type = ProficiencyType.Abilità, Description = "Tre a scelta" },

                // 3
                new() { Type = ProficiencyType.Armature, Description = "Armature leggere, armature medie, scudi" },
                new() { Type = ProficiencyType.Armi, Description = "Armi semplici" },
                new() { Type = ProficiencyType.Strumenti, Description = "Nessuno" },
                new() { Type = ProficiencyType.TiriSalvezza, Description = "Saggezza, Carisma" },
                new() { Type = ProficiencyType.Abilità, Description = "Due a scelta tra Intuizione, Medicina, Persuasione, Religione e Storia" },

                // 4
                new() { Type = ProficiencyType.Armature, Description = "Armature leggere, armature medie, scudi (i druidi non usano armature e scudi fatti di metallo)" },
                new() { Type = ProficiencyType.Armi, Description = "Bastoni ferrati, dardi, falcetti, fionde, giavellotti, lance, mazze, pugnali, randelli, scimitarre" },
                new() { Type = ProficiencyType.Strumenti, Description = "Borsa da erborista" },
                new() { Type = ProficiencyType.TiriSalvezza, Description = "Intelligenza, Saggezza" },
                new() { Type = ProficiencyType.Abilità, Description = "Due a scelta tra Addestrare Animali, Arcano, Intuizione, Medicina, Natura, Percezione, Religione e Sopravvivenza" },

                // 5
                new() { Type = ProficiencyType.Armature, Description = "Tutte le armature, scudi" },
                new() { Type = ProficiencyType.Armi, Description = "Armi semplici, armi da guerra" },
                new() { Type = ProficiencyType.Strumenti, Description = "Nessuno" },
                new() { Type = ProficiencyType.TiriSalvezza, Description = "Forza, Costituzione" },
                new() { Type = ProficiencyType.Abilità, Description = "Due abilita a scelta tra Acrobazia, Addestrare Animali, Atletica, Intimidire, Intuizione, Percezione, Sopravvivenza e Storia" },

                // 6
                new() { Type = ProficiencyType.Armature, Description = "Armature leggere" },
                new() { Type = ProficiencyType.Armi, Description = "Armi semplici, balestre a mano, spade corte, spade lunghe, stocchi" },
                new() { Type = ProficiencyType.Strumenti, Description = "Arnesi da scasso" },
                new() { Type = ProficiencyType.TiriSalvezza, Description = "Destrezza, Intelligenza" },
                new() { Type = ProficiencyType.Abilità, Description = "Quattro a scelta tra Acrobazia, Atletica, Furtività, Indagare, Inganno, Intimidire, Intrattenere, Intuizione, Percezione, Persuasione e Rapidità di Mano" },

                // 7
                new() { Type = ProficiencyType.Armature, Description = "Nessuno" },
                new() { Type = ProficiencyType.Armi, Description = "Balestre leggere, bastoni ferrati, dardi, fionde, pugnali" },
                new() { Type = ProficiencyType.Strumenti, Description = "Nessuno" },
                new() { Type = ProficiencyType.TiriSalvezza, Description = "Intelligenza, Saggezza" },
                new() { Type = ProficiencyType.Abilità, Description = "Due a scelta tra Arcano, Indagare, Intuizione, Medicina, Religione e Storia" },

                // 8
                new() { Type = ProficiencyType.Armature, Description = "Nessuno" },
                new() { Type = ProficiencyType.Armi, Description = "Armi semplici, spade corte" },
                new() { Type = ProficiencyType.Strumenti, Description = "Un tipo di strumenti da artigiano o uno strumento musicale" },
                new() { Type = ProficiencyType.TiriSalvezza, Description = "Forza, Destrezza" },
                new() { Type = ProficiencyType.Abilità, Description = "Due a scelta tra Acrobazia, Atletica, Furtività, Intuizione, Religione e Storia" },

                // 9
                new() { Type = ProficiencyType.Armature, Description = "Tutte le armature, scudi" },
                new() { Type = ProficiencyType.Armi, Description = "Armi semplici, armi da guerra" },
                new() { Type = ProficiencyType.Strumenti, Description = "Nessuno" },
                new() { Type = ProficiencyType.TiriSalvezza, Description = "Saggezza, Carisma" },
                new() { Type = ProficiencyType.Abilità, Description = "Due a scelta tra Atletica, Intimidire, Intuizione, Medicina, Persuasione e Religione" },

                // 10
                new() { Type = ProficiencyType.Armature, Description = "Armature leggere, armature medie, scudi" },
                new() { Type = ProficiencyType.Armi, Description = "Armi semplici, armi da guerra" },
                new() { Type = ProficiencyType.Strumenti, Description = "Nessuno" },
                new() { Type = ProficiencyType.TiriSalvezza, Description = "Forza, Destrezza" },
                new() { Type = ProficiencyType.Abilità, Description = "Tre a scelta tra Addestrare Animali, Atletica, Furtività, Indagare, Intuizione, Natura, Percezione e Sopravvivenza" },

                // 11
                new() { Type = ProficiencyType.Armature, Description = "Nessuna" },
                new() { Type = ProficiencyType.Armi, Description = "Balestre leggere, bastoni ferrati, dardi, fionde, pugnali" },
                new() { Type = ProficiencyType.Strumenti, Description = "Nessuno" },
                new() { Type = ProficiencyType.TiriSalvezza, Description = "Costituzione, Carisma" },
                new() { Type = ProficiencyType.Abilità, Description = "Due a scelta tra Arcano, Inganno, Intimidire, Intuizione, Persuasione e Religione" },

                // 12
                new() { Type = ProficiencyType.Armature, Description = "Armature leggere" },
                new() { Type = ProficiencyType.Armi, Description = "Armi semplici" },
                new() { Type = ProficiencyType.Strumenti, Description = "Nessuno" },
                new() { Type = ProficiencyType.TiriSalvezza, Description = "Saggezza, Carisma" },
                new() { Type = ProficiencyType.Abilità, Description = "Due a scelta tra Arcano, Indagare, Inganno, Intimidire, Natura, Religione e Storia" },

                // 13
                new() { Type = ProficiencyType.Armature, Description = "Armature leggere, armature medie, scudi" },
                new() { Type = ProficiencyType.Armi, Description = "Armi semplici, balestre a mano, balestre pesanti" },
                new() { Type = ProficiencyType.Strumenti, Description = "Arnesi da scasso, strumenti da artigiano (uno a scelta), strumenti da inventore" },
                new() { Type = ProficiencyType.TiriSalvezza, Description = "Costituzione, Intelligenza" },
                new() { Type = ProficiencyType.Abilità, Description = "Due a scelta tra Arcano, Storia, Indagare, Medicina, Natura, Percezione, Rapidità di Mano" }
            };

            await context.Proficiencies.AddRangeAsync(model);
            await context.SaveChangesAsync();

            var classProficiencies = new List<ClassProficiency>();

            var map = new Dictionary<string, List<string>>
            {
                ["Barbaro"] = new()
                {
                    "Armature leggere, armature medie, scudi",
                    "Armi semplici, armi da guerra",
                    "Nessuno",
                    "Forza, Costituzione",
                    "Due a scelta tra Addestrare Animali, Atletica, Intimidire, Natura, Percezione e Sopravvivenza"
                },
                ["Bardo"] = new()
                {
                    "Armature leggere",
                    "Armi semplici, balestre a mano, spade corte, spade lunghe, stocchi",
                    "Tre strumenti musicali a scelta del bardo",
                    "Destrezza, Carisma",
                    "Tre a scelta"
                },
                ["Chierico"] = new()
                {
                    "Armature leggere, armature medie, scudi",
                    "Armi semplici",
                    "Nessuno",
                    "Saggezza, Carisma",
                    "Due a scelta tra Intuizione, Medicina, Persuasione, Religione e Storia"
                },
                ["Druido"] = new()
                {
                    "Armature leggere, armature medie, scudi (i druidi non usano armature e scudi fatti di metallo)",
                    "Bastoni ferrati, dardi, falcetti, fionde, giavellotti, lance, mazze, pugnali, randelli, scimitarre",
                    "Borsa da erborista",
                    "Intelligenza, Saggezza",
                    "Due a scelta tra Addestrare Animali, Arcano, Intuizione, Medicina, Natura, Percezione, Religione e Sopravvivenza"
                },
                ["Guerriero"] = new()
                {
                    "Tutte le armature, scudi",
                    "Armi semplici, armi da guerra",
                    "Nessuno",
                    "Forza, Costituzione",
                    "Due abilita a scelta tra Acrobazia, Addestrare Animali, Atletica, Intimidire, Intuizione, Percezione, Sopravvivenza e Storia"
                },
                ["Ladro"] = new()
                {
                    "Armature leggere",
                    "Armi semplici, balestre a mano, spade corte, spade lunghe, stocchi",
                    "Arnesi da scasso",
                    "Destrezza, Intelligenza",
                    "Quattro a scelta tra Acrobazia, Atletica, Furtività, Indagare, Inganno, Intimidire, Intrattenere, Intuizione, Percezione, Persuasione e Rapidità di Mano"
                },
                ["Mago"] = new()
                {
                    "Nessuno",
                    "Balestre leggere, bastoni ferrati, dardi, fionde, pugnali",
                    "Nessuno",
                    "Intelligenza, Saggezza",
                    "Due a scelta tra Arcano, Indagare, Intuizione, Medicina, Religione e Storia"
                },
                ["Monaco"] = new()
                {
                    "Nessuno",
                    "Armi semplici, spade corte",
                    "Un tipo di strumenti da artigiano o uno strumento musicale",
                    "Forza, Destrezza",
                    "Due a scelta tra Acrobazia, Atletica, Furtività, Intuizione, Religione e Storia"
                },
                ["Paladino"] = new()
                {
                    "Tutte le armature, scudi",
                    "Armi semplici, armi da guerra",
                    "Nessuno",
                    "Saggezza, Carisma",
                    "Due a scelta tra Atletica, Intimidire, Intuizione, Medicina, Persuasione e Religione"
                },
                ["Ranger"] = new()
                {
                    "Armature leggere, armature medie, scudi",
                    "Armi semplici, armi da guerra",
                    "Nessuno",
                    "Forza, Destrezza",
                    "Tre a scelta tra Addestrare Animali, Atletica, Furtività, Indagare, Intuizione, Natura, Percezione e Sopravvivenza"
                },
                ["Stregone"] = new()
                {
                    "Nessuna",
                    "Balestre leggere, bastoni ferrati, dardi, fionde, pugnali",
                    "Nessuno",
                    "Costituzione, Carisma",
                    "Due a scelta tra Arcano, Inganno, Intimidire, Intuizione, Persuasione e Religione"
                },
                ["Warlock"] = new()
                {
                    "Armature leggere",
                    "Armi semplici",
                    "Nessuno",
                    "Saggezza, Carisma",
                    "Due a scelta tra Arcano, Indagare, Inganno, Intimidire, Natura, Religione e Storia"
                },
                ["Artefice"] = new()
                {
                    "Armature leggere, armature medie, scudi",
                    "Armi semplici, balestre a mano, balestre pesanti",
                    "Arnesi da scasso, strumenti da artigiano (uno a scelta), strumenti da inventore",
                    "Costituzione, Intelligenza",
                    "Due a scelta tra Arcano, Storia, Indagare, Medicina, Natura, Percezione, Rapidità di Mano"
                }
            };

            foreach (var entry in map)
            {
                var classEntity = await context.Classes
                    .FirstOrDefaultAsync(c => c.Name.ToLower() == entry.Key.ToLower());

                if (classEntity == null)
                {
                    Console.WriteLine($"[MISSING CLASS] {entry.Key}");
                    continue;
                }

                foreach (var desc in entry.Value)
                {
                    var prof = await context.Proficiencies
                        .FirstOrDefaultAsync(p => p.Description.ToLower() == desc.ToLower());

                    if (prof == null)
                    {
                        Console.WriteLine($"[MISSING PROFICIENCY] '{desc}' for class {entry.Key}");
                        continue;
                    }

                    classProficiencies.Add(new ClassProficiency
                    {
                        ClassId = classEntity.Id,
                        ProficiencyId = prof.Id
                    });
                }
            }

            await context.ClassProficiencies.AddRangeAsync(classProficiencies);
            await context.SaveChangesAsync();
        }
    }
}
