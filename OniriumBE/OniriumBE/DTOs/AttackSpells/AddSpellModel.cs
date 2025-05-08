using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.AttackSpells
{
    public class AddSpellModel
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        //public IFormFile? Image { get; set; }

        [Required]
        public string LevelId { get; set; }

        [Required]
        public string SchoolId { get; set; }

        [Required]
        public bool IsRitual { get; set; }

        [Required]
        public string Description { get; set; }

        public string? ExtraDescription { get; set; }

        [Required]
        public string CostId { get; set; }

        public List<SpellDamageDto>? Damage { get; set; }
        public string? SavingThrowId { get; set; }

        [Required]
        public bool IsConcentration { get; set; }

        [Required]
        [StringLength(50)]
        public string Range { get; set; }

        [Required]
        public string DurationId { get; set; }

        [Required]
        public string Components { get; set; }
    }
}
