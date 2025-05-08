using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using OniriumBE.Models.Items;
using System.Text.Json.Serialization;

namespace OniriumBE.Models.Campaign.CampaignChar
{
    public class CampaignCharItem
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid CampaignCharacterId { get; set; }

        [ForeignKey("CampaignCharacterId")]
        [JsonIgnore]
        public CampaignCharacter CampaignCharacter { get; set; }

        [Required]
        public Guid ItemId { get; set; }

        [ForeignKey(nameof(ItemId))]
        public Items.Items Item { get; set; }

        [Required]
        public int Quantity { get; set; }
        [Required]
        public bool IsEquiped { get; set; }
    }
}
