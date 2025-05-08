using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.AttackSpells
{
    public class SpellComponentDto
    {
        [Key]
        public Guid Id { get; set; }

        [Required, StringLength(20)]
        public string Name { get; set; }
    }
}
