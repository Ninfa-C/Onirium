using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace CustomersManager.Models.Auth;

public class ApplicationUserRole : IdentityUserRole<string>
{
    public Guid UserId { get; set; }
    public Guid RoleId { get; set; }
    public DateTime Date { get; set; }

    [ForeignKey("UserId")]
    public ApplicationUser User { get; set; }
    [ForeignKey("RoleId")]
    public ApplicationRole Role { get; set; }
}