namespace OniriumBE.DTOs.Character
{
    public class CharacterUpdateModel
    {
        public string Name { get; set; }
        public string Image { get; set; }
        public Guid? BackgroundId { get; set; }
        public Guid? RaceId { get; set; }
        public Guid? SubraceId { get; set; }
        public int? LifePoints { get; set; }
    }
}
