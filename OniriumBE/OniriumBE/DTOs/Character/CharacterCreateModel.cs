using OniriumBE.DTOs.AttackSpells;
using OniriumBE.DTOs.Inventory;

namespace OniriumBE.DTOs.Character
{
    public class CharacterCreateModel
    {
        public string? Name { get; set; }
        public IFormFile? Image { get; set; } = null;
        public int LifePoints { get; set; }
        //se spunta is custom, usare i singoli servizi New altrimenti inserirle i guid 
        public Guid BackgroundId { get; set; }
        public Guid RaceId { get; set; }
        public Guid? SubraceId { get; set; }
        public int MaxWeight { get; set; }
        public List<AddClassCharacterModel> ClassAssignments { get; set; } = new();
        public List<AddStartingBoostCharacterModel> Startings { get; set; } = new();
        public List<AddStatCharacterModel> Stats { get; set; } = new();
        public List<AddSkillCharacterModel> Skills { get; set; } = new();
        public List<AddItemToInventoryModel>? Items { get; set; }
        public List<AddSpellToCharacterModel>? Spells { get; set; }
        public List<AddTraitToCharacterModel>? Traits { get; set; }
    }
}
