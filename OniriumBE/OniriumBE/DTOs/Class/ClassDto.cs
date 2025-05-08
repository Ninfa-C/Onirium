namespace OniriumBE.DTOs.Class
{
    public class ClassDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public string ImageSemplifier { get; set; }
        public int RequiredLevelForSubclass { get; set; }
        public List<SubclassDto> Subclasses { get; set; }
        public List<ClassFeatureDto> Traits { get; set; }
        public List<ProficiencisDto> Proficiencies { get; set; }
    }
}
