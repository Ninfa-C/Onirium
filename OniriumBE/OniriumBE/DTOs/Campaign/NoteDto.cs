namespace OniriumBE.DTOs.Campaign
{
    public class NoteDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public bool IsVisible { get; set; }
        public IFormFile? Image { get; set; } = null;
        public bool MasterOnly { get; set; }
        public string? ImageString { get; set; } = null;
    }
}
