using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.ItemsDtos
{
    public class ItemEffectCreateModel
    {
        [Required]
        public string EffectType { get; set; }

        [Required]
        public string Description { get; set; }

        public int Value { get; set; }
        public Guid? AffectedStat { get; set; }
    }
}
