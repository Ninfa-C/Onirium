using System.ComponentModel.DataAnnotations;
using CustomersManager.Models.Auth;
using System.ComponentModel.DataAnnotations.Schema;

namespace OniriumBE.Models.Items
{
    public class Items
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string? Name { get; set; }
        public string? Description { get; set; }
        [Required]
        public decimal Weight { get; set; }
        public int Value { get; set; }
        public int ItemCategoryId { get; set; }
        [ForeignKey(nameof(ItemCategoryId))]
        public ItemCategory? ItemCategory { get; set; }
        public bool IsMagical { get; set; }
        [Required]
        public bool IsCustom { get; set; } = false;
        public string? UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public ApplicationUser? User { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
