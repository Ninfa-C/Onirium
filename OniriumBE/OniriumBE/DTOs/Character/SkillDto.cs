namespace OniriumBE.DTOs.Character
{
    public class SkillDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Stat { get; set; }
        public bool IsCustom { get; set; }
        public bool IsProficient { get; set; }
    }
}
