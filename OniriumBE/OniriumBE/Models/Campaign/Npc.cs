using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using OniriumBE.Models.Char;

namespace OniriumBE.Models.Campaign
{
    public class Npc
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public Guid CampaignId { get; set; }
        [ForeignKey(nameof(CampaignId))]
        public Campaign Campaign { get; set; }
        [Required]
        public string Role { get; set; }
        public string Description { get; set; }
        public Guid CharId { get; set; }
        [ForeignKey(nameof(CharId))]
        public Character Char { get; set; }
        public bool Meet { get; set; } = false;
        public string MasterNotes { get; set; }
        public bool IsVisible { get; set; } = false;
    }
}
