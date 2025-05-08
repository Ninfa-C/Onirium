namespace OniriumBE.DTOs.ItemsDtos.ShowInfoModels
{
    public class ArmorDto : ItemBaseDto
    {
        public string ArmorType { get; set; }
        public int ArmorClass { get; set; }
        public bool HasDisadvantageOnStealth { get; set; }
        public List<ItemRequirementDto> Requirements { get; set; } = new List<ItemRequirementDto>();
    }
}
