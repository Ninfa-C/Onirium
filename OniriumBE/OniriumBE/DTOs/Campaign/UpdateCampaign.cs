namespace OniriumBE.DTOs.Campaign
{
    public class UpdateCampaign
    {
        public string Name { get; set; }
        public IFormFile? Image { get; set; } = null;
        public string Description { get; set; }
    }
}
