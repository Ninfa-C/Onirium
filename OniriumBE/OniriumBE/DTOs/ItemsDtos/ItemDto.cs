using OniriumBE.DTOs.ItemsDtos.ShowInfoModels;

namespace OniriumBE.DTOs.ItemsDtos
{
    public class ItemDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Weight { get; set; }
        public int Value { get; set; }
        public bool IsMagical { get; set; }
        public string ItemCategory { get; set; }
        public List<ItemEffectDto> Effects { get; set; }
        public List<ItemDamageDto> Damages { get; set; }
    }
}
