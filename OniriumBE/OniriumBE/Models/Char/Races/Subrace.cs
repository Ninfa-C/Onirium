using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using CustomersManager.Models.Auth;

namespace OniriumBE.Models.Char.Races
{
    public class Subrace
    {
        [Key]
        public Guid Id { get; set; }

        [Required, StringLength(50)]
        public string Name { get; set; }

        [Required]
        public Guid RaceId { get; set; }
        [ForeignKey(nameof(RaceId))]
        public Race Race { get; set; }
        public ICollection<RaceTraitAssignment> TraitAssignments { get; set; }
        [Required]
        public bool IsCustom { get; set; } = false;
        public string? UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }
        public DateTime CreatedAd { get; set; }
    }
}
