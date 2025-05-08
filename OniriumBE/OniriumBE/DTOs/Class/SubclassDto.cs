namespace OniriumBE.DTOs.Class
{
    public class SubclassDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<ClassFeatureDto> Traits { get; set; }
    }
}
