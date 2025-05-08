namespace OniriumBE.DTOs.Races
{
    public class RacialTraitDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsCustom { get; set; }
        public DateTime CreatedAd { get; set; }
        public string UserId { get; set; }
    }
}
