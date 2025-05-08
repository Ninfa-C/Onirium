using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OniriumBE.Models.Shop
{
    public class Product
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int CategoryId { get; set; }
        [ForeignKey(nameof(CategoryId))]
        public Category Category { get; set; }
        [Required]
        [Column(TypeName = "decimal(8,2)")]
        public decimal Price { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public DateTime CratedAt { get; set; }
        [Required]
        public DateTime LastUpdated { get; set; }
        public ICollection<Variant> Variants { get; set; }
    }
}
