using System.ComponentModel.DataAnnotations;
using OniriumBE.Models.Items;

namespace OniriumBE.Models.AttackSpells
{
    public class Damage
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string DamageDice { get; set; }
        [Required]
        public string DamageType { get; set; }
        public ICollection<SpellSpellDamage>? SpellSpellDamages { get; set; }
        public ICollection<ItemDamage> ItemSpellDamages { get; set; }

    }
}
