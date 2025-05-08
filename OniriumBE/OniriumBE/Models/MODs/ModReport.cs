using CustomersManager.Models.Auth;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.MODs
{
    public class ModReport
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid ModId { get; set; }
        [ForeignKey(nameof(ModId))]
        public Mod Mod { get; set; }

        [Required]
        public string UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }

        [Required]
        public string Reason { get; set; }

        public DateTime ReportDate { get; set; } = DateTime.UtcNow;

        public bool IsResolved { get; set; } = false;

        public string ResolvedBy { get; set; }
        [ForeignKey(nameof(ResolvedBy))]
        public ApplicationUser ResolvedByUser { get; set; }

        public string ResolutionNotes { get; set; }
    }
}
