using OniriumBE.Models.Char.Backgrounds;
using OniriumBE.Models.Char.Races;
using OniriumBE.Models.Char;
using OniriumBE.Models.Items;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;

namespace OniriumBE.Models.Campaign.CampaignChar
{
    public class CampaignCharacter
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Image { get; set; }
        public string BackgroundName { get; set; }
        public string RaceName { get; set; }
        public string? SubraceName { get; set; }
        public int Level { get; set; }
        public int ProficiencyBonus { get; set; }
        public int TotalLifePoints { get; set; }
        public int CurrentLifePoints { get; set; }
        public int TemporaryLifePoints { get; set; }
        public ICollection<CharacterClass> Classes { get; set; }
        public ICollection<CampaignCharacterStat> Stats { get; set; }
        public ICollection<CampaignCharItem> Inventory { get; set; }
        public ICollection<CampaignCharTrait> Traits { get; set; }
        public ICollection<CampaignCharSpells> Spells { get; set; }
        public ICollection<CampaignCharacterSkills> Skills { get; set; }
    }
}
