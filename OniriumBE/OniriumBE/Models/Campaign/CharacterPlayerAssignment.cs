using System.ComponentModel.DataAnnotations.Schema;
using OniriumBE.Models.Campaign.CampaignChar;
using OniriumBE.Models.Char;

namespace OniriumBE.Models.Campaign
{
    public class CharacterPlayerAssignment
    {
        public Guid Id { get; set; }

        // Foreign Key verso Character
        public Guid CharacterId { get; set; }
        [ForeignKey(nameof(CharacterId))]
        public CampaignCharacter Character { get; set; }

        // Foreign Key verso PlayerCampaign
        public int PlayerCampaignId { get; set; }
        [ForeignKey(nameof(PlayerCampaignId))]
        public Players PlayerCampaign { get; set; }

        public bool IsAlive { get; set; } = true;
        public List<string> Notes { get; set; } = new List<string>();

    }
}
