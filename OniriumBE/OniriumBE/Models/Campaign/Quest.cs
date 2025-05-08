using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.Campaign
{
    public class Quest
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid CampaignId { get; set; }

        [ForeignKey(nameof(CampaignId))]
        public Campaign Campaign { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Status { get; set; }

        public string Description { get; set; }

        public string? Reward { get; set; }
        public string? MasterNotes { get; set; }
        public bool IsVisible { get; set; } = false;
    }
}
