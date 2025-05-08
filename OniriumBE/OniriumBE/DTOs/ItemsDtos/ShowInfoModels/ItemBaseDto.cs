using System.Text.Json.Serialization;

namespace OniriumBE.DTOs.ItemsDtos.ShowInfoModels
{
    public class ItemBaseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Weight { get; set; }
        public int Value { get; set; }
        public string ItemCategory { get; set; }
        public bool IsMagical { get; set; }
    }
}
