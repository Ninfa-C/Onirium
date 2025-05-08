using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.Mods
{
    public class ModContentCreateModel
    {
        [Required]
        public string ContentType { get; set; }

        [Required]
        public Guid ContentId { get; set; }
    }
}
