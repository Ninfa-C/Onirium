using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.Shop
{
    public class Color
    {
        [Key]
        public int IdColor { get; set; }
        [Required]
        public string Name { get; set; }
        public ICollection<ColorImage> Images { get; set; }
        public ICollection<Variant> Variants { get; set; }

    }
}
