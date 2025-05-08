using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using OniriumBE.Models.Char.Races;

namespace OniriumBE.Models.Char.Races
{
    public class RaceTraitAssignment
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid TraitId { get; set; }
        [ForeignKey(nameof(TraitId))]
        public RacialTraits Trait { get; set; }

        public Guid? RaceId { get; set; }
        [ForeignKey(nameof(RaceId))]
        public Race Race { get; set; }
        public Guid? SubraceId { get; set; }
        [ForeignKey(nameof(SubraceId))]
        public Subrace Subrace { get; set; }

    }
}
