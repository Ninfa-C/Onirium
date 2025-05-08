namespace OniriumBE.DTOs.Campaign
{
    public class CampaignListDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Img { get; set; }
        public string Role { get; set; } 
        public string GameMasterName { get; set; }
    }
}
