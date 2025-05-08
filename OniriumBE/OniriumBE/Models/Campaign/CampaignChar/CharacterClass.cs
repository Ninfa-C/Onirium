using OniriumBE.Models.Char.Classes;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using OniriumBE.DTOs.Class;

namespace OniriumBE.Models.Campaign.CampaignChar
{
    public class CharacterClass
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid CampaignCharacterId { get; set; }

        [ForeignKey("CampaignCharacterId")]
        [JsonIgnore]
        public CampaignCharacter CampaignCharacter { get; set; }

        public string ClassName { get; set; }

        public int LevelInClass { get; set; }
        public string? SubClassName { get; set; }
        public ICollection<Proficiency> ClassProficiencies { get; set; }
    }
}
