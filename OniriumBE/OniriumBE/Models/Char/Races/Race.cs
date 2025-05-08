using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CustomersManager.Models.Auth;
using OniriumBE.Models.Char.Races;

namespace OniriumBE.Models.Char.Races
{
    public class Race
    {
        [Key]
        public Guid Id { get; set; }

        [Required, StringLength(50)]
        public string Name { get; set; }

        public string Description { get; set; }
        public ICollection<RaceTraitAssignment> TraitAssignments { get; set; }
        public ICollection<Subrace> Subraces { get; set; }
        [Required]
        public bool IsCustom { get; set; } = false;
        public string? UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
