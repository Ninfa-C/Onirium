using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.MODs
{
    public class ModContent
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid ModId { get; set; }

        [Required, MaxLength(50)]
        public string ContentType { get; set; }

        [Required]
        public Guid ContentId { get; set; }

        [ForeignKey(nameof(ModId))]
        public Mod Mod { get; set; }
    }
}
