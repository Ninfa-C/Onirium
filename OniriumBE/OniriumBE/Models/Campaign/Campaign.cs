using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;
using CustomersManager.Models.Auth;
using Microsoft.CodeAnalysis;

namespace OniriumBE.Models.Campaign
{
    public class Campaign
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string? Img { get; set; }
        [Required]
        public string GameMasterId { get; set; }
        [ForeignKey(nameof(GameMasterId))]
        public ApplicationUser Master { get; set; }
        public string? Description { get; set; }
        [Required]
        public DateTime CreateAt { get; set; }
        public bool IsDeleted { get; set; } = false;
        public ICollection<Players> Players { get; set; }
        public ICollection<Session> Sessions { get; set; }
        public ICollection<Location> Locations { get; set; }
        public ICollection<Npc> Npcs { get; set; }
        public ICollection<Quest> Quests { get; set; }
        public ICollection<CampaignNote> Notes { get; set; }
    }
}
