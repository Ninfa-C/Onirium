using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.AttackSpells
{
    public class SpellLevelDto
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Level { get; set; }
    }
}
