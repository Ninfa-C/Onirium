namespace OniriumBE.DTOs.Character
{
    public class TraitQueryModel
    {
        public Guid RaceId { get; set; }
        public Guid? SubraceId { get; set; }
        public Guid BackgroundId { get; set; }

        public List<ClassAssignmentQueryModel> ClassAssignments { get; set; } = new();
    }
}
