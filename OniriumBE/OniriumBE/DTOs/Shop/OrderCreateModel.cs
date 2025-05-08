using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.Shop
{
    public class OrderCreateModel
    {
        [Required]
        public List<OrderItemModel> Items { get; set; }
    }
}
