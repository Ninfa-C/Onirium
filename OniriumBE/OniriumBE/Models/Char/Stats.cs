using System.ComponentModel.DataAnnotations;
using CustomersManager.Models.Auth;
using System.ComponentModel.DataAnnotations.Schema;
using OniriumBE.Models.Char.Classes;

namespace OniriumBE.Models.Char
{
    public class Stats
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }
        public string? UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }
        public DateTime CreatedAd { get; set; }
        [Required]
        public bool IsCustom { get; set; } = false;
    }
}
