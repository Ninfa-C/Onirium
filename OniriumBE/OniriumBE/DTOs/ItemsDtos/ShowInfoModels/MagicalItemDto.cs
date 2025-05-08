using OniriumBE.Models.Items;
using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.ItemsDtos.ShowInfoModels
{
    public class MagicalItemDto : ItemBaseDto
    {
        public string Rarity { get; set; }
        public int? Charges { get; set; }
        public bool RequiresAttunement { get; set; }
        public List<ItemEffectDto>? Effects { get; set; } = new();
    }
}
