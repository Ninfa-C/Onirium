using OniriumBE.DTOs.AttackSpells;
using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.Character
{
    public class CharSpellInfo
    {
        public Guid Id { get; set; }
        public string SpellLevel { get; set; }
        public bool IsPrepared { get; set; }
        public string? Name { get; set; }
        public string? School { get; set; }
        public bool IsRitual { get; set; }
        public string? Description { get; set; }
        public string? ExtraDescription { get; set; }
        public string? Cost { get; set; }
        public List<SpellDamageDto>? Damage { get; set; }
        public string? SavingThrowId { get; set; }
        public bool IsConcentration { get; set; }
        public string? Range { get; set; }
        public string? Duration { get; set; }
        public string? Components { get; set; }
    }
}
