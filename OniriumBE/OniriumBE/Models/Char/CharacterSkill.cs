using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.Char
{
    public class CharacterSkill
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid CharacterId { get; set; }
        [ForeignKey(nameof(CharacterId))]
        public Character Character { get; set; }
        [Required]
        public Guid SkillId { get; set; }
        [ForeignKey(nameof(SkillId))]
        public Skill Skill { get; set; }

        public bool IsProficient { get; set; }

    }
}
