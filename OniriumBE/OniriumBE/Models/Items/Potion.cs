namespace OniriumBE.Models.Items
{
    public class Potion : Items
    {
        public ICollection<ItemEffect> Effects { get; set; } = new List<ItemEffect>();
    }
}
