using Microsoft.EntityFrameworkCore;
using OniriumBE.Models.Shop;

namespace OniriumBE.Data.Seeders.ShopSeeders
{
    public class ShopColorSeeder
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            if (await context.Color.AnyAsync()) return;

            var colors = new List<Color>
            {
                new() { Name = "Nero"},
                new() { Name = "Bianco"},
                new() { Name = "Rosso"},
                new() { Name = "Blu" },
                new() { Name = "Verde" },
                new() { Name = "Oro"},
                new() { Name = "Argento"},
                new() { Name = "Rosa"},
                new() { Name = "Arancione"},
                new() { Name = "Marrone"},
                new() { Name = "Viola"},
                new() { Name = "Multicolore"},
                new() { Name = "Grigio"},
                new() { Name = "Giallo"},

            };

            await context.Color.AddRangeAsync(colors);
            await context.SaveChangesAsync();
        }
    }
}
