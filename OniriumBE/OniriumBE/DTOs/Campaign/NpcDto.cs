using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using OniriumBE.DTOs.Character;

namespace OniriumBE.DTOs.Campaign
{
    public class NpcDto
    {
        public Guid Id { get; set; }
        public string Role { get; set; }
        public string Description { get; set; }
        public CharacterDto Char { get; set; }
        public bool Meet { get; set; }
        public bool IsVisible { get; set; }
        public string MasterNotes { get; set; }

    }
}
