namespace OniriumBE.DTOs.Mods
{
    public class ModReportDto
    {
        public Guid Id { get; set; }
        public Guid ModId { get; set; }
        public string UserId { get; set; }
        public string Reason { get; set; }
        public DateTime ReportDate { get; set; }
        public bool IsResolved { get; set; }
        public string ResolvedBy { get; set; }
        public string ResolutionNotes { get; set; }
    }
}
