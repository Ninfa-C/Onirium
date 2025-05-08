using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using CustomersManager.Models.Auth;

namespace OniriumBE.Models.Shop
{
    public class Order
    {
        [Key]
        public int OrderID { get; set; }
        [Required]
        public string UserID { get; set; }
        [ForeignKey(nameof(UserID))]
        public ApplicationUser User { get; set; }
        [Required]
        public DateTime OrderDate { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        public decimal TotalAmount { get; set; }
        public string OrderStatus { get; set; }

        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
