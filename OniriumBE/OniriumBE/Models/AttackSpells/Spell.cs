using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using CustomersManager.Models.Auth;
using OniriumBE.Models.Char;
using OniriumBE.Models.Char.Classes;

namespace OniriumBE.Models.AttackSpells
{
    public class Spell
    {
        [Required]
        public Guid Id { get; set; }
        [Required, StringLength(100)]
        public string? Name { get; set; }
        // public string Image { get; set; }
        [Required]
        public Guid LevelId { get; set; }
        [ForeignKey("LevelId")]
        public SpellLevel? Level { get; set; }
        [Required]
        public Guid SchoolId { get; set; }
        [ForeignKey("SchoolId")]
        public SpellSchool? School { get; set; }
        [Required]
        public bool IsRitual { get; set; }
        [Required]
        public string? Description { get; set; }
        public string? ExtraDescription { get; set; }
        [Required]
        public Guid CostId { get; set; }
        [ForeignKey("CostId")]
        public SpellCost? Cost { get; set; }
        public ICollection<SpellSpellDamage>? SpellSpellDamages { get; set; }
        public ICollection<ClassSpell>? ClassSpell { get; set; }
        public Guid? SavingThrowId { get; set; }
        [ForeignKey("SavingThrowId")]
        public Stats? SavingThrow { get; set; }
        [Required]
        public bool IsConcentration { get; set; }
        [Required, StringLength(50)]
        public string? Range { get; set; }
        [Required]
        public Guid DurationId { get; set; }
        [ForeignKey("DurationId")]
        public SpellDuration? Duration { get; set; }

        [Required]
        public Guid ComponentsId { get; set; }
        [ForeignKey("ComponentsId")]
        public SpellComponent? Components { get; set; }
        [Required]
        public bool IsCustom { get; set; } = false;
        public string? UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public ApplicationUser? User { get; set; }
        public DateTime CreatedAd { get; set; }
    }
}
