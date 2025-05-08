using Microsoft.EntityFrameworkCore;
using OniriumBE.Models.Shop;

namespace OniriumBE.Data.Seeders.ShopSeeders
{
    public class ShopSizeSeeder
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            if (await context.Size.AnyAsync()) return;

            var sizes = new List<Size>
            {
                new() { Name = "TU" },
                new() { Name = "XS" },
                new() { Name = "S" },
                new() { Name = "M" },
                new() { Name = "L" },
                new() { Name = "XL" },
                new() { Name = "XXL" }
            };

            await context.Size.AddRangeAsync(sizes);
            await context.SaveChangesAsync();
        }
    }
}
