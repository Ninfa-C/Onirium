using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using OniriumBE.Models.AttackSpells;
using System.Text.Json.Serialization;

namespace OniriumBE.Models.Campaign.CampaignChar
{
    public class CampaignCharSpells
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid CampaignCharacterId { get; set; }

        [ForeignKey("CampaignCharacterId")]
        [JsonIgnore]
        public CampaignCharacter CampaignCharacter { get; set; }

        [Required]
        public Guid SpellId { get; set; }
        [ForeignKey(nameof(SpellId))]
        public Spell Spell { get; set; }
        public bool IsPrepared { get; set; }

    }
}
