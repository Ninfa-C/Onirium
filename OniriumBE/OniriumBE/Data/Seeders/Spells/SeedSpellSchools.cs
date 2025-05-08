using Microsoft.EntityFrameworkCore;
using OniriumBE.Models.AttackSpells;
using OniriumBE.Models.Char;

namespace OniriumBE.Data.Seeders.Spells
{
    public static class SeedSpellSchools
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            if (await context.SpellSchools.AnyAsync()) return;

            var schools = new List<SpellSchool>
            {
                new() { Id = Guid.NewGuid(), Name = "Abiurazione", IsCustom = false },
                new() { Id = Guid.NewGuid(), Name = "Ammaliamento", IsCustom = false },
                new() { Id = Guid.NewGuid(), Name = "Divinazione", IsCustom = false },
                new() { Id = Guid.NewGuid(), Name = "Evocazione", IsCustom = false },
                new() { Id = Guid.NewGuid(), Name = "Illusione", IsCustom = false },
                new() { Id = Guid.NewGuid(), Name = "Invocazione", IsCustom = false },
                new() { Id = Guid.NewGuid(), Name = "Necromanzia", IsCustom = false },
                new() { Id = Guid.NewGuid(), Name = "Trasmutazione", IsCustom = false }
            };

            await context.SpellSchools.AddRangeAsync(schools);
            await context.SaveChangesAsync();
        }
    }
}