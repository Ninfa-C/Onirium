using Microsoft.EntityFrameworkCore;
using OniriumBE.Models.Char;

namespace OniriumBE.Data.Seeders.Core
{
    public static class SeedSkills
    {
        private static Skill CreateSkill(string name, string description, Guid statId)
        {
            return new Skill
            {
                Id = Guid.NewGuid(),
                Name = name,
                Description = description,
                StatId = statId,
                IsCustom = false
            };
        }

        private static async Task<Dictionary<string, Guid>> GetStatsId(ApplicationDbContext context)
        {
            var stats = await context.Stats.ToListAsync();
            return stats.ToDictionary(
                s => s.Name,
                s => s.Id
            );
        }

        public static async Task SeedAsync(ApplicationDbContext context)
        {
            if (await context.Skills.AnyAsync()) return;

            var statsId = await GetStatsId(context);

            var skills = new List<Skill>
            {
                // Forza
                CreateSkill("Atletica", "Scalare, saltare e nuotare.", statsId["Forza"]),                
                // Destrezza
                CreateSkill("Acrobazia", "Mantenere l'equilibrio ed evitare cadute.", statsId["Destrezza"]),
                CreateSkill("Furtività", "Muoversi senza farsi notare.", statsId["Destrezza"]),
                CreateSkill("Rapidità di mano", "Borseggiare e manipolare oggetti di nascosto.", statsId["Destrezza"]),                
                // Intelligenza
                CreateSkill("Arcano", "Conoscenze sulla magia e le arti arcane.", statsId["Intelligenza"]),
                CreateSkill("Indagare", "Cercare indizi e analizzare dettagli.", statsId["Intelligenza"]),
                CreateSkill("Natura", "Conoscenze su animali, piante e geologia.", statsId["Intelligenza"]),
                CreateSkill("Religione", "Conoscenze su divinità e rituali sacri.", statsId["Intelligenza"]),
                CreateSkill("Storia", "Conoscenze eventi storici e civiltà perdute.", statsId["Intelligenza"]),                
                // Saggezza
                CreateSkill("Addestrare animali", "Permette di addestrare/cavalcare animali o interagire con loro", statsId["Saggezza"]),
                CreateSkill("Intuizione", "Capire intenzioni e individuare menzogne.", statsId["Saggezza"]),
                CreateSkill("Medicina", "Curare ferite e diagnosticare malattie.", statsId["Saggezza"]),
                CreateSkill("Percezione", "Notare dettagli e suoni sospetti.", statsId["Saggezza"]),
                CreateSkill("Sopravvivenza", "Seguire tracce e orientarsi.", statsId["Saggezza"]),                
                // Carisma
                CreateSkill("Inganno", "Mentire e convincere con falsità.", statsId["Carisma"]),
                CreateSkill("Intimidazione", "Spaventare e minacciare.", statsId["Carisma"]),
                CreateSkill("Intrattenere", "Esibirsi con musica, storie o spettacoli.", statsId["Carisma"]),
                CreateSkill("Persuasione", "Convincere con diplomazia.", statsId["Carisma"])
            };

            await context.Skills.AddRangeAsync(skills);
            await context.SaveChangesAsync();
        }


    }
}