using static OniriumBE.Models.Char.Stats;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using OniriumBE.Models.Char;

namespace OniriumBE.Models.Items
{
    public class ItemEffect
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string? EffectType { get; set; }
        [MaxLength(200)]
        public string? Description { get; set; }

        [Required]
        public int Value { get; set; }

        public Guid? AffectedStat { get; set; }

        [ForeignKey(nameof(AffectedStat))]
        public Stats? AffectedStatObject { get; set; }
        [Required]
        public bool IsCustom { get; set; } = false;
        public Guid? PotionId { get; set; }
        [ForeignKey(nameof(PotionId))]
        public Potion? Potion { get; set; }

        public Guid? MagicalItemId { get; set; }
        [ForeignKey(nameof(MagicalItemId))]
        public MagicalItem? MagicalItem { get; set; }
    }
}
