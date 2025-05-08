namespace OniriumBE.DTOs.Mods
{
    public class ModDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int DownloadCount { get; set; }
        public string UserId { get; set; }
        public bool IsApproved { get; set; }
        public bool IsDeleted { get; set; }
        public List<ModContentDto> Contents { get; set; }
        public List<ModRatingDto> Ratings { get; set; }
    }
}
