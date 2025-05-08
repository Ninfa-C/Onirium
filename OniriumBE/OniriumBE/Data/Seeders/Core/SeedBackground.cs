using Microsoft.EntityFrameworkCore;
using OniriumBE.Models.Char;
using OniriumBE.Models.Char.Backgrounds;

namespace OniriumBE.Data.Seeders.Core
{
    public class SeedBackground
    {
        private static Background Create(string name, string description)
        {
            return new Background
            {
                Id = Guid.NewGuid(),
                Name = name,
                Description = description,
                IsCustom = false
            };
        }
        private static async Task<Dictionary<string, Guid>> GetSkils(ApplicationDbContext context)
        {
            var skill = await context.Skills.ToListAsync();
            return skill.ToDictionary(
                s => s.Name,
                s => s.Id
            );
        }

        public static async Task SeedAsync(ApplicationDbContext context)
        {
            if (await context.Backgrounds.AnyAsync()) return;

            var skillIds = await GetSkils(context);

            var backgrounds = new List<Background>
            {
                Create("Accolito", "Un devoto servitore di una divinità, che ha passato la propria vita a studiare la religione e ad aiutare i bisognosi."),
                Create("Artigiano della Gilda","Un membro di una gilda che ha una grande abilità in un mestiere specifico"),
                Create("Ciarlatano","Un abile truffatore che si guadagna da vivere con inganni e finte promesse."),
                Create("Criminale","Una persona che vive al di fuori della legge, che ha una lunga storia di attività criminali."),
                Create("Eremita","Un individuo che ha scelto di vivere in solitudine, lontano dalla società, alla ricerca di saggezza."),
                Create("Eroe Popolare","Una persona che ha guadagnato fama e ammirazione tra la gente per le sue imprese eroiche."),
                Create("Forestiero","Un individuo che ha vissuto fuori dalla società civile, probabilmente in una zona selvaggia."),
                Create("Intrattenitore","Un artista, musicista, o performer che si esibisce per guadagnarsi da vivere."),
                Create("Marinaio","Un esperto del mare, che ha passato gran parte della sua vita su una nave."),
                Create("Monello","Un giovane che vive per strada, rubando e sopravvivendo grazie a piccoli crimini."),
                Create("Nobile","Un individuo che appartiene alla classe alta, con terra e titolo, spesso coinvolto nella politica e nelle relazioni sociali."),
                Create("Sapiente","Un esperto studioso, che ha dedicato la sua vita all'acquisizione di conoscenza."),
                Create("Soldato","Un veterano delle forze armate, che ha combattuto in guerre e battaglie")
            };

            await context.Backgrounds.AddRangeAsync(backgrounds);
            await context.SaveChangesAsync();

            var backgroundSkills = new List<BackgroundSkill>();
            var associations = new Dictionary<string, string[]>
            {
                ["Accolito"] = ["Religione", "Persuasione"],
                ["Artigiano della Gilda"] = ["Intuizione", "Persuasione"],
                ["Ciarlatano"] = ["Inganno", "Rapidità di mano"],
                ["Criminale"] = ["Inganno", "Furtività"],
                ["Eremita"] = ["Religione", "Medicina"],
                ["Eroe Popolare"] = ["Addestrare animali", "Sopravvivenza"],
                ["Forestiero"] = ["Atletica", "Sopravvivenza"],
                ["Intrattenitore"] = ["Intrattenere", "Acrobazia"],
                ["Marinaio"] = ["Atletica", "Percezione"],
                ["Monello"] = ["Furtività", "Rapidità di mano"],
                ["Nobile"] = ["Storia", "Persuasione"],
                ["Sapiente"] = ["Arcano", "Storia"],
                ["Soldato"] = ["Atletica", "Intimidazione"],

            };

            foreach (var (bgName, skills) in associations)
            {
                var bg = backgrounds.FirstOrDefault(b => b.Name == bgName);

                foreach (var skillName in skills)
                {
                    if (!skillIds.TryGetValue(skillName, out var skillId))
                        throw new KeyNotFoundException($"Skill {skillName} non trovata");

                    backgroundSkills.Add(new BackgroundSkill
                    {
                        Id = Guid.NewGuid(),
                        BackgroundId = bg.Id,
                        SkillId = skillId
                    });
                }
            }
            await context.BackgroundSkills.AddRangeAsync(backgroundSkills);
            await context.SaveChangesAsync();
        }

    }
}
