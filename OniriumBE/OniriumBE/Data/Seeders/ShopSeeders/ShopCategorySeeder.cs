using Microsoft.EntityFrameworkCore;
using OniriumBE.Models.Items;
using OniriumBE.Models.Shop;

namespace OniriumBE.Data.Seeders.ShopSeeders
{
    public class ShopCategorySeeder
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {

            if (await context.Category.AnyAsync()) return;

            var model = new List<Category>
            {
                new() { Name = "Dadi" },
                new() { Name = "Manuali" },
                new() { Name = "Accessori" },
                new() { Name = "Miniature" },
                new() { Name = "Contenuti Digitali" },
                new() { Name = "Abbigliamento " },
            };

            //if (await context.Category.CountAsync() >= model.Count)
            //{
            //    return;
            //}
            //context.Category.RemoveRange(await context.Category.ToListAsync());
            await context.Category.AddRangeAsync(model);
            await context.SaveChangesAsync();
        }
    }
}
