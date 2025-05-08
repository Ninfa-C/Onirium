using OniriumBE.DTOs.Character;

namespace OniriumBE.DTOs.Background
{
    public class BackroundDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsCustom { get; set; }
        public List<SkillDto>? Skills { get; set; } = null;
    }
}
