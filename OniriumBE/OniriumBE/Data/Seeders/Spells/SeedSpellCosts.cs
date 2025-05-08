using Microsoft.EntityFrameworkCore;
using OniriumBE.Models.AttackSpells;
using OniriumBE.Models.Char;

namespace OniriumBE.Data.Seeders.Spells
{
    public static class SeedSpellCosts
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            if (await context.SpellCosts.AnyAsync()) return;

            var costs = new List<SpellCost>
            {
                new() { Id = Guid.NewGuid(), Cost = "Azione" },
                new() { Id = Guid.NewGuid(), Cost = "Bonus" },
                new() { Id = Guid.NewGuid(), Cost = "Reazione" },
                new() { Id = Guid.NewGuid(), Cost = "1 minuto" },
                new() { Id = Guid.NewGuid(), Cost = "10 minuti" },
                new() { Id = Guid.NewGuid(), Cost = "8 ore" },
                new() { Id = Guid.NewGuid(), Cost = "12 ore" },
                new() { Id = Guid.NewGuid(), Cost = "1 ora" },
            };
            //if (await context.SpellCosts.CountAsync() >= costs.Count)
            //{
            //    return;
            //}
            //context.SpellCosts.RemoveRange(await context.SpellCosts.ToListAsync());

            await context.SpellCosts.AddRangeAsync(costs);
            await context.SaveChangesAsync();
        }
    }
}