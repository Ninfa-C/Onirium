namespace OniriumBE.DTOs.Class
{
    public class CharClassInfoShow
    {
        public int Level { get; set; }
        public string Name { get; set; }
        public string SubClass { get; set; }
        public List<ProficiencisDto>? Proficiencies { get; set; }
    }
}
