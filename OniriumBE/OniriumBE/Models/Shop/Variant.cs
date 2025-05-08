using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OniriumBE.Models.Shop
{
    public class Variant
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public Guid ProductId { get; set; }
        [ForeignKey(nameof(ProductId))]
        public Product Product { get; set; }
        [Required]
        public int ColorId { get; set; }
        [ForeignKey(nameof(ColorId))]
        public Color Color { get; set; }

        public ICollection<Stock> Stocks { get; set; }
    }
}
