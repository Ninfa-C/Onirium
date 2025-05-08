using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.Shop
{
    public class ReviewCreateModel
    {
        [Required]
        public Guid ProductId { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; }

        [Required]
        public string Comment { get; set; }
    }
}
