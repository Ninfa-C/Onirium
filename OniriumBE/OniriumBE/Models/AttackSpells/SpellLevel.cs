using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.AttackSpells
{
    public class SpellLevel
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Level { get; set; }
    }
}
