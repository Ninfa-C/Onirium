using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.Campaign
{
    public class CampaignInviteToken
    {
        [Key]
        public Guid Token { get; set; }

        [Required]
        public Guid CampaignId { get; set; }

        [Required]
        public string Email { get; set; }

        public string Role { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public bool IsUsed { get; set; } = false;
    }
}
