using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.AttackSpells
{
    public class AddSpellToCharacterModel
    {
        [Required]
        public Guid SpellId { get; set; }

        [Range(0, 9)]
        public int? SpellLevel { get; set; } = 0;

        public bool IsPrepared { get; set; } = false;
    }
}
