using OniriumBE.Models.Char.Classes;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.Char.Backgrounds
{
    public class BackgroundPrivilegeAssignment
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid TraitId { get; set; }
        [ForeignKey(nameof(TraitId))]
        public BackgroundPrivilege Trait { get; set; }

        public Guid? BackgroundId { get; set; }
        [ForeignKey(nameof(BackgroundId))]
        public Background Background { get; set; }

    }
}
