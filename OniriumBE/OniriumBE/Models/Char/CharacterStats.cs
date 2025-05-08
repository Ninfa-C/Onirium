using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OniriumBE.Models.Char
{
    public class CharacterStats
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid CharacterId { get; set; }

        [ForeignKey(nameof(CharacterId))]
        public Character Character { get; set; }
        [Required]
        public Guid StatId { get; set; }
        [ForeignKey(nameof(StatId))]
        public Stats Stat { get; set; }

        [Range(1, 20)]
        public int Value { get; set; }
    }
}
