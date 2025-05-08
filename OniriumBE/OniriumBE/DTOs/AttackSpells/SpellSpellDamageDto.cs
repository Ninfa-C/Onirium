using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using OniriumBE.Models.AttackSpells;

namespace OniriumBE.DTOs.AttackSpells
{
    public class SpellSpellDamageDto
    {
        [Required]
        public Guid Id { get; set; }

        [Required]
        public Guid SpellId { get; set; }
        [ForeignKey("SpellId")]
        public SpellDTO Spell { get; set; }

        [Required]
        public Guid SpellDamageId { get; set; }
        [ForeignKey("SpellDamageId")]
        public SpellDamageDto? SpellDamage { get; set; }
    }
}
