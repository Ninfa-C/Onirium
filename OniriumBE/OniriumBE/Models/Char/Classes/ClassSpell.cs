using OniriumBE.Models.AttackSpells;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.Char.Classes
{
    public class ClassSpell
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid ClassId { get; set; }

        [ForeignKey(nameof(ClassId))]
        public Class Class { get; set; }

        [Required]
        public Guid SpellId { get; set; }

        [ForeignKey(nameof(SpellId))]
        public Spell Spell { get; set; }
        public int RequiredClassLevel { get; set; }

    }
}
