using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace OniriumBE.Models.Campaign.CampaignChar
{
    public class CampaignCharacterStat
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid CampaignCharacterId { get; set; }

        [ForeignKey("CampaignCharacterId")]
        [JsonIgnore]
        public CampaignCharacter CampaignCharacter { get; set; }

        [Required]
        public string Name { get; set; }

        public int Value { get; set; }
    }
}
