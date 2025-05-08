using OniriumBE.Models.AttackSpells;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.Char.Backgrounds
{
    public class BackgroundSkill
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid SkillId { get; set; }
        [ForeignKey(nameof(SkillId))]
        public Skill Skill { get; set; }

        [Required]
        public Guid BackgroundId { get; set; }
        [ForeignKey(nameof(BackgroundId))]
        public Background Background { get; set; }
    }
}
