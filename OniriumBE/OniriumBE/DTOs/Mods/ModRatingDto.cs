using OniriumBE.DTOs.Account;

namespace OniriumBE.DTOs.Mods
{
    public class ModRatingDto
    {
        public Guid Id { get; set; }
        public Guid ModId { get; set; }
        public string UserId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserDto User { get; set; }
    }
}
