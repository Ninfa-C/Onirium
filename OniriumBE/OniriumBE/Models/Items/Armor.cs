using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.Items
{
    public class Armor : Items
    {
        public string ArmorType { get; set; }
        [Range(0, 30)]
        public int ArmorClass { get; set; }

        public bool HasDisadvantageOnStealth { get; set; }

        public ICollection<ItemRequirement> Requirements { get; set; } = new List<ItemRequirement>();
    }
}
