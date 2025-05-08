using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OniriumBE.Models.Char.Classes
{
    public class ClassFeaturesAssignmente
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid TraitId { get; set; }
        [ForeignKey(nameof(TraitId))]
        public ClassFeatures Trait { get; set; }

        public Guid? ClassId { get; set; }
        [ForeignKey(nameof(ClassId))]
        public Class Class { get; set; }

        public Guid? SubclassId { get; set; }
        [ForeignKey(nameof(SubclassId))]
        public Subclass Subclass { get; set; }
    }
}
