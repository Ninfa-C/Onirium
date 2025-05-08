using Microsoft.AspNetCore.Identity;

namespace CustomersManager.Models.Auth;

public class ApplicationRole : IdentityRole
{
    public ICollection<ApplicationUserRole> UserRoles { get; set; }
}