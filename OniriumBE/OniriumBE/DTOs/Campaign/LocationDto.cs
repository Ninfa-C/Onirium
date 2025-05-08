namespace OniriumBE.DTOs.Campaign
{
    public class LocationDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public bool Visited { get; set; }
        public string? ImageString { get; set; }
        public IFormFile? Image { get; set; } = null;
        public string? MasterNotes { get; set; }

        public bool IsVisible { get; set; }
    }
}
