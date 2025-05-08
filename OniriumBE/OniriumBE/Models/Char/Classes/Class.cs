using System.ComponentModel.DataAnnotations;
using CustomersManager.Models.Auth;
using System.ComponentModel.DataAnnotations.Schema;

namespace OniriumBE.Models.Char.Classes
{
    public class Class
    {
        [Key]
        public Guid Id { get; set; }

        [Required, StringLength(50)]
        public string Name { get; set; }
        public string Image { get; set; }
        public string ImageSemplifier { get; set; }
        public string Description { get; set; }
        public int RequiredLevelForSubclass { get; set; }
        public ICollection<Subclass> Subclasses { get; set; } = new List<Subclass>();
        public ICollection<ClassFeaturesAssignmente> TraitAssignments { get; set; }
        [Required]
        public bool IsCustom { get; set; } = false;
        public string? UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<ClassSpell>? ClassSpell { get; set; }
        public ICollection<ClassProficiency> ClassProficiencies { get; set; }
    }
}
