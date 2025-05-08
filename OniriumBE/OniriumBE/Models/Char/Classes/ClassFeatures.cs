using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using CustomersManager.Models.Auth;

namespace OniriumBE.Models.Char.Classes
{
    public class ClassFeatures
    {

        [Key]
        public Guid Id { get; set; }

        [Required, StringLength(100)]
        public string Name { get; set; }
        public int LevelRequired { get; set; }

        public string Description { get; set; }
        [Required]
        public bool IsCustom { get; set; }
        public string? UserId { get; set; }
        [ForeignKey(nameof(UserId))]
        public ApplicationUser User { get; set; }
        public DateTime CreatedAd { get; set; }

    }
}
