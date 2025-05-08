using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.AttackSpells
{
    public class SpellCostDto
    {
        [Key]
        public Guid Id { get; set; }

        [Required, StringLength(50)]
        public string Cost { get; set; }
    }
}
