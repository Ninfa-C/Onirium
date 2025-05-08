using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.Class
{
    public class FeaturesDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsCustom { get; set; } = false;
    }
}
