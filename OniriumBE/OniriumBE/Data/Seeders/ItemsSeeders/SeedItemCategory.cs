using Microsoft.EntityFrameworkCore;
using OniriumBE.Models.AttackSpells;
using OniriumBE.Models.Items;

namespace OniriumBE.Data.Seeders.ItemsSeeders
{
    public class SeedItemCategory
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {

            if (await context.ItemCategories.AnyAsync()) return;

            var model = new List<ItemCategory>
            {
                new() { Name = "Arma" },
                new() { Name = "Armatura" },
                new() { Name = "Pozione" },
                new() { Name = "Oggetto Magico" },
                new() { Name = "Strumento" },
                new() { Name = "Artefatto" },
                new() { Name = "Oggetti da Utilizzo"},
                new() { Name = "Materiali " },
                new() { Name = "Oggetti da Commercio" },
                new() { Name = "Equipaggiamenti Vari" },
            };

            //if (await context.SpellComponents.CountAsync() >= model.Count)
            //{
            //    return;
            //}
            //context.ItemCategories.RemoveRange(await context.ItemCategories.ToListAsync());
            await context.ItemCategories.AddRangeAsync(model);
            await context.SaveChangesAsync();
        }
    }
}
