using System.ComponentModel.DataAnnotations;
using CustomersManager.Models.Auth;
using System.ComponentModel.DataAnnotations.Schema;

namespace OniriumBE.Models.Char.Backgrounds
{
    public class Background
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public ICollection<BackgroundSkill>? BackgroundSkills { get; set; }
        public ICollection<BackgroundPrivilegeAssignment>? BackgroundPrivileges { get; set; }
        public ICollection<Character>? Characters { get; set; }
        [Required]
        public bool IsCustom { get; set; }
        public string? UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
