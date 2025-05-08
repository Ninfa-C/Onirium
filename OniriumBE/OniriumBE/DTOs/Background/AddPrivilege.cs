using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.Background
{
    public class AddPrivilege
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsCustom { get; set; } = false;
    }
}
