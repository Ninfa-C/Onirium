namespace OniriumBE.DTOs.ItemsDtos
{
    public class ItemUpdateModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal? Weight { get; set; }
        public int? Value { get; set; }
        public bool? IsMagical { get; set; }
        public int? ItemCategoryId { get; set; }
    }
}
