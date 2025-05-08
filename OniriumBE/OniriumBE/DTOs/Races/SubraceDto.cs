namespace OniriumBE.DTOs.Races
{
    public class SubraceDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<RacialTraitDto> Traits { get; set; }
    }
}
