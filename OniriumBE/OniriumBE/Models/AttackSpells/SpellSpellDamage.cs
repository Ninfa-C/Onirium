using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.AttackSpells
{
    public class SpellSpellDamage
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid SpellId { get; set; }
        [ForeignKey("SpellId")]
        public Spell Spell { get; set; }

        [Required]
        public Guid SpellDamageId { get; set; }
        [ForeignKey("SpellDamageId")]
        public Damage SpellDamage { get; set; }
    }
}
