using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using OniriumBE.Models.Char;

namespace OniriumBE.Models.Items
{
    public class ItemRequirement
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public Guid StatId { get; set; }
        [ForeignKey(nameof(StatId))]
        public Stats Stats { get; set; }
        [Required]
        public int MinimumValue { get; set; }
        [Required]
        public Guid ArmorId { get; set; }

        [ForeignKey(nameof(ArmorId))]
        public Armor Armor { get; set; }
    }
}
