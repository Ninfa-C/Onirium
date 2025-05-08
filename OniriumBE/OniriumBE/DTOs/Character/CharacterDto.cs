using OniriumBE.DTOs.AttackSpells;
using OniriumBE.DTOs.Background;
using OniriumBE.DTOs.Class;
using OniriumBE.DTOs.Inventory;
using OniriumBE.DTOs.Races;

namespace OniriumBE.DTOs.Character
{
    public class CharacterDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public BackroundDto Background { get; set; }
        public RaceDto Race { get; set; }
        public SubraceDto? Subrace { get; set; }
        public List<CharClassInfoShow> Class { get; set; }
        public int Level { get; set; }
        public int ProficiencyBonus { get; set; }
        public List<CharacterStatDto> Stats { get; set; }
        public int LifePoints { get; set; }
        public List<CharacterInventoryDto> Inventory { get; set; }
        public ICollection<CharSpellInfo> Spells { get; set; }
        public List<TraitsDto> Traits { get; set; }
        public List<SkillDto> Skills { get; set; }
    }
}
