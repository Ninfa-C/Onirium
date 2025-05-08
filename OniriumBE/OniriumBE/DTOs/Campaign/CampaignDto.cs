using OniriumBE.DTOs.Character;

namespace OniriumBE.DTOs.Campaign
{
    public class CampaignDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string GameMasterId { get; set; }
        public string Description { get; set; }
        public string Role { get; set; }
        public DateTime CreateAt { get; set; }
        public bool IsDeleted { get; set; }
        public string GameMasterName { get; set; }
        public List<PlayerCampaignDto> Players { get; set; }
    }
}
