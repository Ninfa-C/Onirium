using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.Shop
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
