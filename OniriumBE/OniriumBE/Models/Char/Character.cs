using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using CustomersManager.Models.Auth;
using OniriumBE.Models.Char.Backgrounds;
using OniriumBE.Models.Char.Classes;
using OniriumBE.Models.Char.Races;

namespace OniriumBE.Models.Char
{
    public class Character
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string? UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public ApplicationUser? User { get; set; }
        public DateTime CreatedAt { get; set; }
        [Required, StringLength(50)]
        public string Name { get; set; }
        public string Image { get; set; }
        [Required]
        public Guid BackgroundId { get; set; }
        [ForeignKey(nameof(BackgroundId))]
        public Background Background { get; set; }
        [Required]
        public Guid RaceId { get; set; }
        [ForeignKey(nameof(RaceId))]
        public Race Race { get; set; }
        public Guid? SubraceId { get; set; }
        [ForeignKey(nameof(SubraceId))]
        public Subrace Subrace { get; set; }
        public ICollection<ClassAssignment> ClassAssignments { get; set; }
        [Required]
        public int Level
        {
            get
            {
                return ClassAssignments.Sum(x => x.LevelInClass);
            }
        }
        [Required]
        public int ProficiencyBonus
        {
            get
            {
                if (Level >= 1 && Level <= 4) return 2;
                if (Level >= 5 && Level <= 8) return 3;
                if (Level >= 9 && Level <= 12) return 4;
                if (Level >= 13 && Level <= 16) return 5;
                if (Level >= 17 && Level <= 20) return 6;
                return 0;
            }
        }
        [Required]
        public ICollection<CharacterStats> Stats { get; set; }
        public ICollection<CharacterSkill> Skills { get; set; }
        [Required]
        public int LifePoints { get; set; }
        public ICollection<CharacterInventory> CharacterInventories { get; set; }
        public ICollection<CharacterSpell> CharacterSpells { get; set; }
        public DateTime UpdatedAt { get; set; }
        public ICollection<StartingBoost>? StartingBoost { get; set; }
        public ICollection<CharacterTrait>? Traits { get; set; }
        public bool IsDeleted { get; set; }
    }
}
