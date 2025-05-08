using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.AttackSpells
{
    public class SpellCost
    {
        [Key]
        public Guid Id { get; set; }

        [Required, StringLength(50)]
        public string Cost { get; set; }
    }
}
