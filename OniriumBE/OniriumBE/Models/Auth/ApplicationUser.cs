using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace CustomersManager.Models.Auth;

public class ApplicationUser : IdentityUser
{
    [Required]
    public required string Name { get; set; }
    [Required]
    public required string Surname { get; set; }
    [Required]
    public bool IsDeleted { get; set; }
    public string? ProfilePictureUrl { get; set; }
    public ICollection<ApplicationUserRole> UserRoles { get; set; }

}