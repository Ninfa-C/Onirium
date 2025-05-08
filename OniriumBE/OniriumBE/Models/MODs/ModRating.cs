using CustomersManager.Models.Auth;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.MODs
{
    public class ModRating
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid ModId { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required, Range(1, 5)]
        public int Rating { get; set; }

        public string Comment { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey(nameof(ModId))]
        public Mod Mod { get; set; }

        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }
    }
}
