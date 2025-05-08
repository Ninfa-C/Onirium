namespace OniriumBE.DTOs.Campaign
{
    public class QuestDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }
        public string Reward { get; set; }
        public bool IsVisible { get; set; }
        public string? MasterNotes { get; set; }
    }
}
