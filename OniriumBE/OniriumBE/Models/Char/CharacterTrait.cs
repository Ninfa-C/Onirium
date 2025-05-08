using System.ComponentModel.DataAnnotations.Schema;

namespace OniriumBE.Models.Char
{
    public enum TraitSource
    {
        Race,
        Subrace,
        Background,
        Class,
        Subclass
    }
    public class CharacterTrait
    {
        public Guid Id { get; set; }
        public Guid CharacterId { get; set; }
        [ForeignKey(nameof(CharacterId))]
        public Character Character { get; set; }
        public Guid TraitId { get; set; }
        public TraitSource Source { get; set; }
    }
}
