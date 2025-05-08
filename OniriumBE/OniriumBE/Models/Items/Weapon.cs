namespace OniriumBE.Models.Items
{
    public class Weapon : Items
    {
        public ICollection<ItemDamage> Damages { get; set; } = new List<ItemDamage>();
    }
}
