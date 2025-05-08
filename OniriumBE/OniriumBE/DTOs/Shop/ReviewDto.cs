using OniriumBE.DTOs.Account;

namespace OniriumBE.DTOs.Shop
{
    public class ReviewDto
    {
        public int ReviewID { get; set; }
        public string UserID { get; set; }
        public Guid ProductID { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserDto User { get; set; }
    }
}
