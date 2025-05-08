
using System.ComponentModel.DataAnnotations;
using OniriumBE.DTOs.ItemsDtos;
using OniriumBE.DTOs.ItemsDtos.ShowInfoModels;
using OniriumBE.Models.Items;

namespace OniriumBE.DTOs.Inventory
{
    public class InventoryItemAssignmentDto
    {
        public Guid ItemId { get; set; }
        public int Quantity { get; set; }
        public bool IsEquiped { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Weight { get; set; }
        public double Value { get; set; }
        public string Category { get; set; }
        public string? ArmorType { get; set; }
        public int? ArmorClass { get; set; }

        public bool? HasDisadvantageOnStealth { get; set; }
        public List<ItemRequirementDto> Requirements { get; set; } = new();
        public List<ItemDamageDto> Damages { get; set; } = new();
        public List<ItemEffectDto> Effects { get; set; } = new();
    }
}
