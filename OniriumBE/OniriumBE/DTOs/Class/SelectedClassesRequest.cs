namespace OniriumBE.DTOs.Class
{
    public class SelectedClassesRequest
    {
        public List<Guid> ClassIds { get; set; } = new();
        public List<Guid> SubclassIds { get; set; } = new();
    }
}
