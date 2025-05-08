using OniriumBE.Data.Seeders.Core;
using OniriumBE.Data.Seeders.DnD;
using OniriumBE.Data.Seeders.ItemsSeeders;
using OniriumBE.Data.Seeders.Spells;

namespace OniriumBE.Data.Seeders
{
    public static class DataSeeder
    {
        public static async Task SeedAllAsync(ApplicationDbContext context)
        {
            // Core
            await SeedStats.SeedAsync(context);
            await SeedSkills.SeedAsync(context);
            await SeedBackground.SeedAsync(context);
            await SeedBackgroundPrivileges.SeedAsync(context);
            //await SeedSpellData.SeedAsync(context);

            // D&D
            await SeedRacesAndSubraces.SeedAsync(context);
            await SeedClassesAndSubclasses.SeedAsync(context);
            await SeedClassFeatures.SeedAsync(context);
            await SeedClassFeaturesAssignment.SeedAsync(context);
            await SeedRacialTraits.SeedAsync(context);

            //Spells
            await SeedSpellComponents.SeedAsync(context);
            await SeedSpellCosts.SeedAsync(context);
            await SeedSpellDurations.SeedAsync(context);
            await SeedSpellLevel.SeedAsync(context);
            await SeedSpellSchools.SeedAsync(context);
            await SeedSpells.SeedAsync(context);

            //ClassSpell
            await SeedClassSpell.SeedAsync(context);
            await SeedProficiencies.SeedAsync(context);


            //ITEM
            await SeedItemCategory.SeedAsync(context);
            await SeedItems.SeedAsync(context);


        }
    }
}
