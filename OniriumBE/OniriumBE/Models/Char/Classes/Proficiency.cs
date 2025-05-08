using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace OniriumBE.Models.Char.Classes
{
    public enum ProficiencyType
    {
        Armature,
        Armi,
        Strumenti,
        TiriSalvezza,
        Abilità
    }
    public class Proficiency
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ProficiencyType Type { get; set; }
        [Required]
        public string Description { get; set; }

        public ICollection<ClassProficiency> ClassProficiencies { get; set; }

    }
}
