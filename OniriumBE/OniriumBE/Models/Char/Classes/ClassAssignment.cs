using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.Char.Classes
{
    public class ClassAssignment
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid CharacterId { get; set; }
        [ForeignKey(nameof(CharacterId))]
        public Character Character { get; set; }

        [Required]
        public Guid ClassId { get; set; }
        [ForeignKey(nameof(ClassId))]
        public Class Class { get; set; }

        public int LevelInClass { get; set; }
        public Guid? SubclassId { get; set; }
        [ForeignKey(nameof(SubclassId))]
        public Subclass Subclass { get; set; }
    }
}
