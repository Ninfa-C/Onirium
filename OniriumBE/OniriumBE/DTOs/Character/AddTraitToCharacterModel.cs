using OniriumBE.Models.Char;

namespace OniriumBE.DTOs.Character
{
    public class AddTraitToCharacterModel
    {
        public Guid TraitId { get; set; }
        public TraitSource Source { get; set; }

    }
}
