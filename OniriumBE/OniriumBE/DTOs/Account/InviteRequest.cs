using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.Account
{
    public class InviteRequest
    {
        public Guid CampaignId { get; set; }
        public string CampaignName { get; set; }
        public string InviterName { get; set; }
        public List<PlayerInviteDto> Users { get; set; }
    }
}
