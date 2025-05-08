using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.Shop
{
    public class OrderItemModel
    {
        [Required]
        public Guid ProductId { get; set; }

        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }

        [Required]
        public int VariantId { get; set; }

        [Required]
        public int SizeId { get; set; }
    }
}
