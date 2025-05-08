using System.ComponentModel.DataAnnotations;
using CustomersManager.Models.Auth;
using System.ComponentModel.DataAnnotations.Schema;
using OniriumBE.Models.Char.Backgrounds;

namespace OniriumBE.Models.Char
{
    public class Skill
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public Guid StatId { get; set; }
        [ForeignKey(nameof(StatId))]
        public Stats Stat { get; set; }
        public ICollection<BackgroundSkill>? BackgroundSkills { get; set; }
        [Required]
        public bool IsCustom { get; set; } = false;
        public string? UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }
        public DateTime CreatedAd { get; set; }
    }
}
