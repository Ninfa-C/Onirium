using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using OniriumBE.Models.Char;

namespace OniriumBE.Models.Items
{
    public class InventoryItemAssignment
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid InventoryId { get; set; }

        [ForeignKey(nameof(InventoryId))]
        public CharacterInventory Inventory { get; set; }

        [Required]
        public Guid InventoryItemId { get; set; }

        [ForeignKey(nameof(InventoryItemId))]
        public Items InventoryItem { get; set; }

        [Required]
        public int Quantity { get; set; }
        [Required]
        public bool IsEquiped { get; set; }
    }
}
