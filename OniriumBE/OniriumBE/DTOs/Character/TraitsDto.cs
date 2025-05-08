using System.Text.Json.Serialization;
using OniriumBE.Models.Char;
using OniriumBE.Models.Char.Backgrounds;
using OniriumBE.Models.Char.Classes;
using OniriumBE.Models.Char.Races;

namespace OniriumBE.DTOs.Character
{
    public class TraitsDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool IsCustom { get; set; } = false;
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TraitSource Source { get; set; }
        public int? LevelRequired { get; set; }
        public bool IsAvailable { get; set; }
        public Guid? SourceId { get; set; }
        public string SourceNameIt => Source switch
        {
            TraitSource.Race => "Razza",
            TraitSource.Subrace => "Sottorazza",
            TraitSource.Background => "Privilegio",
            TraitSource.Class => "Classe",
            TraitSource.Subclass => "Sottoclasse",
            _ => "Sconosciuto"
        };
    }
}
