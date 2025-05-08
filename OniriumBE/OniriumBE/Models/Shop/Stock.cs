using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;

namespace OniriumBE.Models.Shop
{
    public class Stock
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public int VariantId { get; set; }
        [ForeignKey(nameof(VariantId))]
        public Variant Variante { get; set; }
        [Required]
        public int SizeId { get; set; }
        [ForeignKey(nameof(SizeId))]
        public Size Size { get; set; }
    }
}
