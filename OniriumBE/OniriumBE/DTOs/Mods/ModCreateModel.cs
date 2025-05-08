using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.Mods
{
    public class ModCreateModel
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public List<ModContentCreateModel> Contents { get; set; }
    }
}
