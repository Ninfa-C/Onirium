using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using OniriumBE.Models.Items;

namespace OniriumBE.Models.Char
{
    public class CharacterInventory
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid CharacterId { get; set; }
        [ForeignKey(nameof(CharacterId))]
        public Character Character { get; set; }
        [Required]
        public int MaxWeight { get; set; }

        public ICollection<InventoryItemAssignment> InventoryItemAssignments { get; set; }
    }
}
