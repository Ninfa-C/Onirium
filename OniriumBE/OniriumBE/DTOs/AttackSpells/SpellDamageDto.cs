using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.AttackSpells
{
    public class SpellDamageDto
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string DamageDice { get; set; }
        [Required]
        public string DamageType { get; set; }

    }
}
