using System.ComponentModel.DataAnnotations;
using CustomersManager.Models.Auth;
using Microsoft.AspNetCore.Http.HttpResults;
using System.ComponentModel.DataAnnotations.Schema;

namespace OniriumBE.Models.MODs
{
    public class Mod
    {
        [Key]
        public Guid Id { get; set; }

        [Required, MaxLength(100)]
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        [Required]
        public string Description { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public int DownloadCount { get; set; } = 0;

        [Required]
        public string UserId { get; set; }

        public bool IsApproved { get; set; } = false;

        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }

        public ICollection<ModContent> Contents { get; set; }
        public ICollection<ModRating> Ratings { get; set; }
        public ICollection<ModReport> Reports { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
