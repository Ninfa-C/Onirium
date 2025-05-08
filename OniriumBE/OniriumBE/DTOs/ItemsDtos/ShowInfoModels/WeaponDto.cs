namespace OniriumBE.DTOs.ItemsDtos.ShowInfoModels
{
    public class WeaponDto : ItemBaseDto
    {
        public List<ItemDamageDto> Damages { get; set; } = new List<ItemDamageDto>();
    }
}
