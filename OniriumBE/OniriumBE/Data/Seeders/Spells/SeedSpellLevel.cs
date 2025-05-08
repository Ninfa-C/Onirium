using Microsoft.EntityFrameworkCore;
using OniriumBE.Models.AttackSpells;

namespace OniriumBE.Data.Seeders.Spells
{
    public class SeedSpellLevel
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            if (await context.SpellLevels.AnyAsync()) return;

            var levels = new List<SpellLevel>
            {
                new() { Id = Guid.NewGuid(), Level = "Trucchetto" },
                new() { Id = Guid.NewGuid(), Level = "1" },
                new() { Id = Guid.NewGuid(), Level = "2" },
                new() { Id = Guid.NewGuid(), Level = "3" },
                new() { Id = Guid.NewGuid(), Level = "4" },
                new() { Id = Guid.NewGuid(), Level = "5" },
                new() { Id = Guid.NewGuid(), Level = "6" },
                new() { Id = Guid.NewGuid(), Level = "7" },
                new() { Id = Guid.NewGuid(), Level = "8" },
                new() { Id = Guid.NewGuid(), Level = "9" }
            };

            await context.SpellLevels.AddRangeAsync(levels);
            await context.SaveChangesAsync();
        }
    }
}
