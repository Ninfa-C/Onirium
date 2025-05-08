using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using OniriumBE.DTOs.Class;

namespace OniriumBE.DTOs.AttackSpells
{
    public class SpellDTO
    {
        [Key]
        public Guid Id { get; set; }
        [Required, StringLength(100)]
        public string Name { get; set; }
        //public string? Image { get; set; }
        [Required]
        public string Level { get; set; }
        [Required]
        public string School { get; set; }
        [Required]
        public bool IsRitual { get; set; }
        [Required]
        public string Description { get; set; }
        public string? ExtraDescription { get; set; }
        [Required]
        public string Cost { get; set; }
        public ICollection<SpellDamageDto>? Damage { get; set; }
        public string? SavingThrowId { get; set; }
        [Required]
        public bool IsConcentration { get; set; }
        [Required, StringLength(50)]
        public string Range { get; set; }
        [Required]
        public string Duration { get; set; }

        [Required]
        public string Components { get; set; }
        public List<ClassSpellShowInfo> Classes { get; set; }
    }
}
