using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.Items
{
    public class MagicalItem : Items
    {
        [Required, MaxLength(50)]
        public string? Rarity { get; set; }

        public int? Charges { get; set; }

        public bool RequiresAttunement { get; set; }

        public ICollection<ItemEffect> Effects { get; set; } = new List<ItemEffect>();
    }
}
