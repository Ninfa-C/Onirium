using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.Char.Classes
{
    public class ClassProficiency
    {
        [Key]
        public int Id { get; set; }

        public Guid ClassId { get; set; }
        public Class Class { get; set; }

        public int ProficiencyId { get; set; }
        public Proficiency Proficiency { get; set; }
    }
}
