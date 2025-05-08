using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.Character
{
    public class AddClassCharacterModel
    {
        public Guid ClassId { get; set; }
        [Range(1, 20)]
        public int LevelInClass { get; set; }
        public Guid? SubclassId { get; set; }
    }
}
