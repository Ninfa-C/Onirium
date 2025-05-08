using Microsoft.EntityFrameworkCore;
using OniriumBE.Models.Char;

namespace OniriumBE.Data.Seeders.Core
{
    public static class SeedStats
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            if (await context.Stats.AnyAsync()) return;

            var stats = new List<Stats>        {
            new() { Id = Guid.NewGuid(), Name = "Forza", IsCustom = false },
            new() { Id = Guid.NewGuid(), Name = "Destrezza", IsCustom = false },
            new() { Id = Guid.NewGuid(), Name = "Costituzione", IsCustom = false },
            new() { Id = Guid.NewGuid(), Name = "Intelligenza", IsCustom = false },
            new() { Id = Guid.NewGuid(), Name = "Saggezza", IsCustom = false },
            new() { Id = Guid.NewGuid(), Name = "Carisma", IsCustom = false }

        };
            await context.Stats.AddRangeAsync(stats);
            await context.SaveChangesAsync();
        }
    }
}

