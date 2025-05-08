using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.Campaign.CampaignChar
{
    public class CampaignCharTrait
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }
        public string Source { get; set; }
    }
}
