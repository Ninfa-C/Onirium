namespace OniriumBE.DTOs.ItemsDtos.ShowInfoModels
{
    public class PotionDto : ItemBaseDto
    {
        public List<ItemEffectDto>? Effects { get; set; } = new();
    }
}
