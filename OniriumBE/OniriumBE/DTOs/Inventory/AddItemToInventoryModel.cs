using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.Inventory
{
    public class AddItemToInventoryModel
    {
        [Required]
        public Guid ItemId { get; set; }

        [Range(0, int.MaxValue)]
        public int Quantity { get; set; }

        public bool IsEquiped { get; set; }
    }
}
