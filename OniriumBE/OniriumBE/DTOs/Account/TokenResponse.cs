namespace CustomersManager.DTOs.Account;

public class TokenResponse
{
    public required string Token { get; set; }
    public required DateTime Expires { get; set; }
    public string ProfilePic { get; set; }
}