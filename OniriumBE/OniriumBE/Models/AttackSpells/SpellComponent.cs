using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.AttackSpells
{
    public class SpellComponent
    {
        [Key]
        public Guid Id { get; set; }

        [Required, StringLength(20)]
        public string Name { get; set; }
    }
}
