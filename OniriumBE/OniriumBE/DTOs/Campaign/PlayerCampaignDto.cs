using OniriumBE.DTOs.Account;
using OniriumBE.DTOs.Character;

namespace OniriumBE.DTOs.Campaign
{
    public class PlayerCampaignDto
    {
        public int AssignmenteId { get; set; }
        public string Username { get; set; }
        public string Role { get; set; }
        public List<CharacterSummaryDto> Characters { get; set; }
    }
}
