using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.Campaign
{
    public class UpdateCampaignCharacterDto
    {
        [Required]
        public string Name { get; set; }

        public IFormFile? Image { get; set; } = null;

        public string BackgroundName { get; set; }

        public string RaceName { get; set; }

        public string? SubraceName { get; set; }

        public List<UpdateCharacterClassDto> Classes { get; set; }

        public List<CampaignCharacterStatDto> Stats { get; set; }

        public List<CampaignCharTraitDto> Traits { get; set; }

        public List<CampaignCharacterSkillDto> Skills { get; set; }
    }
}
