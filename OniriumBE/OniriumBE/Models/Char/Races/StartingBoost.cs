using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OniriumBE.Models.Char.Races
{
    public class StartingBoost
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public Guid StatId { get; set; }
        [ForeignKey(nameof(StatId))]
        public Stats Stats { get; set; }
        public int Value { get; set; }
        public Guid? CharId { get; set; }
        [ForeignKey(nameof(CharId))]
        public Character Character { get; set; }
    }
}
