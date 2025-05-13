using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.Shop
{
    public class ColorImage
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ColorId { get; set; }

        [ForeignKey(nameof(ColorId))]
        public Color Color { get; set; }

        [Required]
        public string Image { get; set; }
    }
}
