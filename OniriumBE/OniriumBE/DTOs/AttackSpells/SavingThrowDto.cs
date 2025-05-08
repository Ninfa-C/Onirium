using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.AttackSpells
{
    public class SavingThrowDto
    {
        [Key]
        public Guid Id { get; set; }
        [Required, StringLength(50)]
        public string Name { get; set; }
    }
}
