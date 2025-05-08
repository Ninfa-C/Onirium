using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.Mods
{
    public class ModReportModel
    {
        [Required]
        public string Reason { get; set; }
    }
}
