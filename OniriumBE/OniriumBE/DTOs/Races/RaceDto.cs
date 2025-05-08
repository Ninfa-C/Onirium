namespace OniriumBE.DTOs.Races
{
    public class RaceDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<SubraceDto> Subraces { get; set; }
        public List<RacialTraitDto> Traits { get; set; }
    }
}
