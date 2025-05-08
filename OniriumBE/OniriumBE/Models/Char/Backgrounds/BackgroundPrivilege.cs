using System.ComponentModel.DataAnnotations;
using CustomersManager.Models.Auth;
using System.ComponentModel.DataAnnotations.Schema;

namespace OniriumBE.Models.Char.Backgrounds
{
    public class BackgroundPrivilege
    {
        [Key]
        public Guid Id { get; set; }

        [Required, StringLength(100)]
        public string Name { get; set; }

        public string Description { get; set; }
        [Required]
        public bool IsCustom { get; set; }
        public string? UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }
        public DateTime CreatedAd { get; set; }
        public ICollection<BackgroundPrivilegeAssignment> BackgroundPrivilegeAssignments { get; set; }
    }
}
