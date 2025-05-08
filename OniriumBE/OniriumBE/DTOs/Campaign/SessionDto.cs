namespace OniriumBE.DTOs.Campaign
{
    public class SessionDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public bool Completed { get; set; }
        public string? Summary { get; set; }
        public DateTime? NextSessionDate { get; set; }
        public string? MasterNotes { get; set; }
        public bool IsVisible { get; set; }
    }
}
