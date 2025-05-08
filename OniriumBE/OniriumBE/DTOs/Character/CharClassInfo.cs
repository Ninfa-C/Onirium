using System.ComponentModel.DataAnnotations;
using OniriumBE.DTOs.Class;

namespace OniriumBE.DTOs.Character
{
    public class CharClassInfo
    {
        public Guid Id { get; set; }
        public int Level { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public string ImageSemplifier { get; set; }
        public List<SubclassDto> Subclasses { get; set; }
        public List<ClassFeatureDto> Traits { get; set; }
    }
}
