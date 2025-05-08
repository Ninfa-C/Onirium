using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.Campaign
{
    public class CampaignNote
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
        public string Content { get; set; }
        public string? Image { get; set; }

        public DateTime Date { get; set; }
        public bool MasterOnly { get; set; }
        public bool IsVisible { get; set; } = false;
        public string Createdby { get; set; }
    }
}
