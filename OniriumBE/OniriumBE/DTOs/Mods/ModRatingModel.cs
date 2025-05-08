using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.Mods
{
    public class ModRatingModel
    {
        [Range(1, 5)]
        public int Rating { get; set; }

        [Required]
        public string Comment { get; set; }
    }
}
