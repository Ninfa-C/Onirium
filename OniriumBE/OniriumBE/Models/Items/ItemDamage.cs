using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using OniriumBE.Models.AttackSpells;

namespace OniriumBE.Models.Items
{
    public class ItemDamage
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid WeaponId { get; set; }

        [ForeignKey(nameof(WeaponId))]
        public Weapon Weapon { get; set; }

        [Required]
        public Guid DamageId { get; set; }

        [ForeignKey(nameof(DamageId))]
        public Damage Damage { get; set; }
    }
}
