using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CustomersManager.Models.Auth;
using OniriumBE.Models.Char;
namespace OniriumBE.Models.Campaign
{
    public class Players
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }
        [Required]
        public Guid CampaignId { get; set; }
        [ForeignKey(nameof(CampaignId))]
        public Campaign Campaign { get; set; }
        [Required]
        public string Role { get; set; }
        public ICollection<CharacterPlayerAssignment> CharacterAssignments { get; set; }
    }
}
