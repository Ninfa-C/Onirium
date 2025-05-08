using Microsoft.EntityFrameworkCore;
using OniriumBE.Models.AttackSpells;
using OniriumBE.Models.Char;

namespace OniriumBE.Data.Seeders.Spells
{
    public static class SeedSpellComponents
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {

            if (await context.SpellComponents.AnyAsync()) return;

            var components = new List<SpellComponent>
            {
                new() { Id = Guid.NewGuid(), Name = "V" },
                new() { Id = Guid.NewGuid(), Name = "S" },
                new() { Id = Guid.NewGuid(), Name = "V, S" },
                new() { Id = Guid.NewGuid(), Name = "V, S, M" },
                new() { Id = Guid.NewGuid(), Name = "S, M" },
                new() { Id = Guid.NewGuid(), Name = "V, M" },
                new() { Id = Guid.NewGuid(), Name = "M" }
            };

            //if (await context.SpellComponents.CountAsync() >= components.Count)
            //{
            //    return;
            //}
            //context.SpellComponents.RemoveRange(await context.SpellComponents.ToListAsync());
            await context.SpellComponents.AddRangeAsync(components);
            await context.SaveChangesAsync();
        }
    }
}