using OniriumBE.DTOs.Character;
using OniriumBE.DTOs.Class;

namespace OniriumBE.DTOs.Campaign
{
    public class CharacterSummaryDto
    {
        public Guid AssigngId { get; set; }
        public Guid CharId { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public string RaceName { get; set; }
        public List<CharClassInfoShow> Classes { get; set; }
        public int Level { get; set; }
        public bool IsAlive { get; set; } = true;
        public List<string>? Notes { get; set; }
    }
}
