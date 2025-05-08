using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.Character
{
    public class ClassAssignmentQueryModel
    {
        public Guid Id { get; set; }
        [Range(1, 20)]
        public int LevelInClass { get; set; }
        public Guid? Subclass { get; set; }
    }
}
