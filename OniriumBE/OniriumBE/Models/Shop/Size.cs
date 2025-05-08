using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.Shop
{
    public class Size
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
