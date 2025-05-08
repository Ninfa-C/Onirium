using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.Campaign
{
    public class CampaignCreateModel
    {
        [Required]
        public string Name { get; set; }
        public IFormFile? Image { get; set; } = null;

        public string Description { get; set; }
    }
}
