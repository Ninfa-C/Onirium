using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.ItemsDtos
{
    public class ItemDamageCreateModel
    {
        [Required]
        public string DamageDice { get; set; }

        [Required]
        public string DamageType { get; set; }
    }
}
