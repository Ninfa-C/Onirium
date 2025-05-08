using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.Campaign
{
    public class Location
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public Guid CampaignId { get; set; }
        [ForeignKey(nameof(CampaignId))]
        public Campaign Campaign { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Type { get; set; }
        public string Description { get; set; }
        public bool Visited { get; set; } = false;
        public string? Image { get; set; }
        public string? MasterNotes { get; set; }
        public bool IsVisible { get; set; } = false;
    }
}
