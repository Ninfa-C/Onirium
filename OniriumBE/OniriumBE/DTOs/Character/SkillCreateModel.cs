using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.Character
{
    public class SkillCreateModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public Guid StatId { get; set; }
    }
}
