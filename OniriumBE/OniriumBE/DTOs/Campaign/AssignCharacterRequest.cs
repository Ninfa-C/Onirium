using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.Campaign
{
    public class AssignCharacterRequest
    {
        public Guid CharacterId { get; set; }
        public int PlayerCampaignId { get; set; }
    }
}
