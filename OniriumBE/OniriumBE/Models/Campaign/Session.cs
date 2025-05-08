using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.Campaign
{
    public class Session
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
        public DateTime Date { get; set; }

        public bool Completed { get; set; } = false;

        public string Summary { get; set; }

        public DateTime? NextSessionDate { get; set; }
        public string? MasterNotes { get; set; }
        public bool IsVisible { get; set; } = false;
    }
}
