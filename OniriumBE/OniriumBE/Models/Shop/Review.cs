using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using CustomersManager.Models.Auth;

namespace OniriumBE.Models.Shop
{
    public class Review
    {
        [Key]
        public int ReviewID { get; set; }
        [Required]
        public string UserID { get; set; }
        [ForeignKey(nameof(UserID))]
        public ApplicationUser User { get; set; }
        [Required]
        public Guid ProductID { get; set; }
        [ForeignKey(nameof(ProductID))]
        public Product Product { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }

        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
