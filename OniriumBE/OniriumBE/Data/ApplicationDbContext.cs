using CustomersManager.Models.Auth;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OniriumBE.Models.AttackSpells;
using OniriumBE.Models.Char;
using OniriumBE.Models.Items;
using OniriumBE.Models.Char.Backgrounds;
using OniriumBE.Models.Char.Classes;
using OniriumBE.Models.Char.Races;
using OniriumBE.Models.Shop;
using System.Diagnostics;
using OniriumBE.Models.Campaign;
using System.Reflection.Emit;
using OniriumBE.Models.MODs;
using OniriumBE.Models.Campaign.CampaignChar;

namespace OniriumBE.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string, IdentityUserClaim<string>, ApplicationUserRole, IdentityUserLogin<string>,
        IdentityRoleClaim<string>, IdentityUserToken<string>>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        { }
        //USER
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<ApplicationRole> ApplicationRoles { get; set; }
        public DbSet<ApplicationUserRole> ApplicationUserRole { get; set; }

        //CHARACTERBASE
        public DbSet<Spell> Spells { get; set; }
        public DbSet<Damage> Damages { get; set; }
        //ASSIGNMENT
        public DbSet<SpellSpellDamage> SpellSpellDamages { get; set; }
        public DbSet<SpellLevel> SpellLevels { get; set; }
        public DbSet<SpellSchool> SpellSchools { get; set; }
        public DbSet<SpellDuration> SpellDurations { get; set; }
        public DbSet<SpellComponent> SpellComponents { get; set; }
        public DbSet<SpellCost> SpellCosts { get; set; }
        public DbSet<ClassSpell> ClassSpells { get; set; }
        public DbSet<Stats> Stats { get; set; }
        public DbSet<Background> Backgrounds { get; set; }
        public DbSet<BackgroundSkill> BackgroundSkills { get; set; }
        public DbSet<BackgroundPrivilege> BackgroundPrivilege { get; set; }
        public DbSet<BackgroundPrivilegeAssignment> BackgroundPrivilegeAssignment { get; set; }
        public DbSet<CharacterInventory> CharacterInventories { get; set; }
        public DbSet<CharacterSkill> CharacterSkills { get; set; }
        public DbSet<CharacterSpell> CharacterSpells { get; set; }
        public DbSet<CharacterStats> CharacterStats { get; set; }
        public DbSet<CharacterTrait> CharacterTraits { get; set; }
        public DbSet<Class> Classes { get; set; }
        public DbSet<Proficiency> Proficiencies { get; set; }
        public DbSet<ClassProficiency> ClassProficiencies { get; set; }
        public DbSet<ClassAssignment> ClassAssignments { get; set; }
        public DbSet<InventoryItemAssignment> InventoryItemAssignments { get; set; }
        public DbSet<ItemDamage> ItemDamages { get; set; }
        public DbSet<ItemEffect> ItemEffects { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<Race> Races { get; set; }
        public DbSet<RacialTraits> RacialTraits { get; set; }
        public DbSet<RaceTraitAssignment> RaceTraitAssignment { get; set; }
        public DbSet<Subrace> Subraces { get; set; }
        public DbSet<StartingBoost> StartingBoosts { get; set; }
        public DbSet<Subclass> Subclasses { get; set; }
        public DbSet<ClassFeatures> ClassFeatures { get; set; }
        public DbSet<ClassFeaturesAssignmente> ClassFeaturesAssignments { get; set; }
        public DbSet<Character> Characters { get; set; }
        public DbSet<Items> Items { get; set; }
        public DbSet<ItemCategory> ItemCategories { get; set; }
        public DbSet<ItemRequirement> ItemRequirements { get; set; }
        //SHOP
        public DbSet<Category> Category { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<Color> Color { get; set; }
        public DbSet<Size> Size { get; set; }
        public DbSet<Variant> ProductVariant { get; set; }
        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Review> Reviews { get; set; }
        //MODS
        public DbSet<Mod> Mods { get; set; }
        public DbSet<ModContent> ModContents { get; set; }
        public DbSet<ModRating> ModRatings { get; set; }
        public DbSet<ModReport> ModReports { get; set; }
        //ITEMS
        public DbSet<Weapon> Weapons { get; set; }
        public DbSet<Armor> Armors { get; set; }
        public DbSet<MagicalItem> MagicalItems { get; set; }
        public DbSet<Potion> Potions { get; set; }
        //CAMPAIGN
        public DbSet<Campaign> Campaigns { get; set; }
        public DbSet<Players> PlayerCampaign { get; set; }
        public DbSet<Session> Sessions { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Npc> Npcs { get; set; }
        public DbSet<Quest> Quests { get; set; }
        public DbSet<CampaignNote> CampaignNotes { get; set; }
        public DbSet<CharacterPlayerAssignment> CharacterPlayerAssignments { get; set; }
        public DbSet<CampaignInviteToken> CampaignInviteTokens { get; set; }
        //CAMPAIGN CHARACTER
        public DbSet<CampaignCharacter> CampaignCharacters { get; set; }
        public DbSet<CharacterClass> CharacterClasses { get; set; }
        public DbSet<CampaignCharacterStat> CampaignCharacterStats { get; set; }
        public DbSet<CampaignCharItem> CampaignCharItems { get; set; }
        public DbSet<CampaignCharTrait> CampaignCharTraits { get; set; }
        public DbSet<CampaignCharSpells> CampaignCharSpells { get; set; }
        public DbSet<CampaignCharacterSkills> CampaignCharacterSkills { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUserRole>()
               .Property(p => p.Date)
               .HasDefaultValueSql("GETDATE()")
               .IsRequired(true);

            builder.Entity<ApplicationUserRole>()
                .HasOne(a => a.Role)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(a => a.RoleId);
            builder.Entity<ApplicationUserRole>()
                .HasOne(a => a.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(a => a.UserId);
            builder.Entity<ApplicationRole>().HasData(
               new ApplicationRole { Id = "1", Name = "Admin", NormalizedName = "ADMIN", ConcurrencyStamp = "1" },
               new ApplicationRole { Id = "2", Name = "Moderator", NormalizedName = "MODERATOR", ConcurrencyStamp = "2" },
               new ApplicationRole { Id = "3", Name = "User", NormalizedName = "USER", ConcurrencyStamp = "3" }
               );
            builder.Entity<Character>()
              .Property(p => p.CreatedAt)
              .HasDefaultValueSql("GETDATE()")
              .IsRequired(true);
            builder.Entity<Campaign>()
                .HasQueryFilter(c => !c.IsDeleted);
            builder.Entity<Campaign>()
                .HasOne(c => c.Master)
                .WithMany()
                .HasForeignKey(c => c.GameMasterId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Players>()
                .HasOne(p => p.Campaign)
                .WithMany(c => c.Players)
                .HasForeignKey(p => p.CampaignId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Players>()
                .HasOne(p => p.User)
                .WithMany()
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Items>()
                .HasOne(i => i.User)
                .WithMany()
                .HasForeignKey(i => i.UserId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Items>()
               .HasOne(i => i.User)
               .WithMany()
               .HasForeignKey(i => i.UserId)
               .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Character>()
                .Property(c => c.UserId)
                .IsRequired(false);

            builder.Entity<ModReport>()
                .HasOne(mr => mr.Mod)
                .WithMany(m => m.Reports)
                .HasForeignKey(mr => mr.ModId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<ModReport>()
                .HasOne(mr => mr.User)
                .WithMany()
                .HasForeignKey(mr => mr.UserId);
            builder.Entity<ModReport>()
                .HasOne(mr => mr.ResolvedByUser)
                .WithMany()
                .HasForeignKey(mr => mr.ResolvedBy)
                .IsRequired(false);
            builder.Entity<Mod>()
                .HasOne(m => m.User)
                .WithMany()
                .HasForeignKey(m => m.UserId);
            builder.Entity<ModContent>()
                .HasOne(mc => mc.Mod)
                .WithMany(m => m.Contents)
                .HasForeignKey(mc => mc.ModId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<ModRating>()
                .HasOne(r => r.Mod)
                .WithMany(m => m.Ratings)
                .HasForeignKey(r => r.ModId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<ModRating>()
                .HasOne(r => r.User)
                .WithMany()
                .HasForeignKey(r => r.UserId);
            builder.Entity<Items>()
                .HasDiscriminator<string>("Category")
                .HasValue<Weapon>("Arma")
                .HasValue<Armor>("Armatura")
                .HasValue<Potion>("Pozione")
                .HasValue<MagicalItem>("OggettoMagico");
            builder.Entity<Items>()
                .HasOne(i => i.ItemCategory)
            .WithMany()
            .HasForeignKey(i => i.ItemCategoryId)
            .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Weapon>()
                .HasMany(w => w.Damages)
                .WithOne(d => d.Weapon)
                .HasForeignKey(d => d.WeaponId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Armor>()
                .HasMany(a => a.Requirements)
                .WithOne(r => r.Armor)
                .HasForeignKey(r => r.ArmorId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Damage>()
                .HasMany(d => d.ItemSpellDamages)
                .WithOne(id => id.Damage)
                .HasForeignKey(id => id.DamageId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Potion>()
                .HasMany(p => p.Effects)
                .WithOne(e => e.Potion)
                .HasForeignKey(e => e.PotionId)
                .OnDelete(DeleteBehavior.Restrict);
            builder.Entity<MagicalItem>()
                .HasMany(m => m.Effects)
                .WithOne(e => e.MagicalItem)
                .HasForeignKey(e => e.MagicalItemId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
