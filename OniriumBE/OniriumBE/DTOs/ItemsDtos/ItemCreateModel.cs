using System.ComponentModel.DataAnnotations;
using OniriumBE.DTOs.ItemsDtos.ShowInfoModels;

namespace OniriumBE.DTOs.ItemsDtos
{
    public class ItemCreateModel
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Range(0, double.MaxValue)]
        public decimal Weight { get; set; }
        [Range(0, int.MaxValue)]
        public int Value { get; set; }
        public bool IsMagical { get; set; }
        [Required]
        public int ItemCategoryId { get; set; }
        public List<ItemEffectCreateModel> Effects { get; set; }
        public List<ItemDamageCreateModel> Damages { get; set; }
        public int? ArmorClass { get; set; }
        public string? ArmorType { get; set; }
        public bool? HasDisadvantage { get; set; }
        public List<ItemRequirementDto>? Requirements { get; set; }
    }
}
