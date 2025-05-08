namespace OniriumBE.DTOs.Account
{
    public class UpdateEmailDto
    {
        public string CurrentPassword { get; set; } = null!;
        public string NewEmail { get; set; } = null!;
    }
}
