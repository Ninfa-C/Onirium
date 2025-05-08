using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.Inventory
{
    public class UpdateInventoryItemModel
    {
        [Range(1, int.MaxValue)]
        public int? Quantity { get; set; }
        public bool? IsEquiped { get; set; }
    }
}
