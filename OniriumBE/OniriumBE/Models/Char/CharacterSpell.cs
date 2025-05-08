using OniriumBE.Models.AttackSpells;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.Char
{
    public class CharacterSpell
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid CharacterId { get; set; }
        [ForeignKey(nameof(CharacterId))]
        public Character Character { get; set; }

        [Required]
        public Guid SpellId { get; set; }
        [ForeignKey(nameof(SpellId))]
        public Spell Spell { get; set; }
        public int SpellLevel { get; set; }
        public bool IsPrepared { get; set; }
    }
}
