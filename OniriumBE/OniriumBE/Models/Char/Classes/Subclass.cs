using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using CustomersManager.Models.Auth;

namespace OniriumBE.Models.Char.Classes
{
    public class Subclass
    {
        [Key]
        public Guid Id { get; set; }

        [Required, StringLength(50)]
        public string Name { get; set; }

        [Required]
        public Guid ClassId { get; set; }
        [ForeignKey(nameof(ClassId))]
        public Class Class { get; set; }

        public ICollection<ClassFeaturesAssignmente> TraitAssignments { get; set; }
        [Required]
        public bool IsCustom { get; set; } = false;
        public string? UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }
        public DateTime CreatedAd { get; set; }
    }
}
