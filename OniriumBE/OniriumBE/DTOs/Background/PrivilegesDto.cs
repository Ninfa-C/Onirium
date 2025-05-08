namespace OniriumBE.DTOs.Background
{
    public class PrivilegesDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsCustom { get; set; } = false;
    }
}
