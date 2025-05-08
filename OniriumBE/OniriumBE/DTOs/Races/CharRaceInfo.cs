namespace OniriumBE.DTOs.Races
{
    public class CharRaceInfo
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<RacialTraitDto> Traits { get; set; }
    }
}
