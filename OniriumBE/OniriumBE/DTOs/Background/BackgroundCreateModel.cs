using CustomersManager.Models.Auth;
using OniriumBE.Models.Char.Backgrounds;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using OniriumBE.DTOs.Character;

namespace OniriumBE.DTOs.Background
{
    public class BackgroundCreateModel
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public bool IsCustom { get; set; }
        public List<Guid> SkillIds { get; set; } = new();
        public List<SkillCreateModel>? NewSkills { get; set; } = new();
        public List<Guid> PrivilegeId { get; set; } = new();

    }
}
