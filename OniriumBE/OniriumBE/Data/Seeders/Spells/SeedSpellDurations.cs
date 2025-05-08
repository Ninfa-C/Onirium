using Microsoft.EntityFrameworkCore;
using OniriumBE.Models.AttackSpells;
using OniriumBE.Models.Char;

namespace OniriumBE.Data.Seeders.Spells
{
    public static class SeedSpellDurations
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            if (await context.SpellDurations.AnyAsync()) return;

            var durations = new List<SpellDuration>
            {
                new() { Id = Guid.NewGuid(), Name = "Istantanea", IsCustom = false },
                new() { Id = Guid.NewGuid(), Name = "1 minuto", IsCustom = false },
                new() { Id = Guid.NewGuid(), Name = "10 minuti", IsCustom = false },
                new() { Id = Guid.NewGuid(), Name = "1 ora", IsCustom = false },
                new() { Id = Guid.NewGuid(), Name = "8 ore", IsCustom = false },
                new() { Id = Guid.NewGuid(), Name = "12 ore", IsCustom = false },
                new() { Id = Guid.NewGuid(), Name = "24 ore", IsCustom = false },
                new() { Id = Guid.NewGuid(), Name = "1 round", IsCustom = false },
                new() { Id = Guid.NewGuid(), Name = "7 giorni", IsCustom = false },
                new() { Id = Guid.NewGuid(), Name = "10 giorni", IsCustom = false },
                new() { Id = Guid.NewGuid(), Name = "Fino a dissoluzione", IsCustom = false },
                new() { Id = Guid.NewGuid(), Name = "30 giorni", IsCustom = false },
                new() { Id = Guid.NewGuid(), Name = "Speciale", IsCustom = false },
            };

            //if (await context.SpellDurations.CountAsync() >= durations.Count)
            //{
            //    return;
            //}
            //context.SpellDurations.RemoveRange(await context.SpellDurations.ToListAsync());

            await context.SpellDurations.AddRangeAsync(durations);
            await context.SaveChangesAsync();
        }
    }
}