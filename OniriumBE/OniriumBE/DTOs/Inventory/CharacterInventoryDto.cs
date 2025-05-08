namespace OniriumBE.DTOs.Inventory
{
    public class CharacterInventoryDto
    {
        public int MaxWeight { get; set; }
        public List<InventoryItemAssignmentDto> Items { get; set; }
    }
}
