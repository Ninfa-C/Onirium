using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.Items
{
    public class ItemCategory
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public ICollection<Items> Items { get; set; }
    }
}
