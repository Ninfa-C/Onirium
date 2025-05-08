using Microsoft.EntityFrameworkCore;
using OniriumBE.Models.Char.Backgrounds;
using OniriumBE.Models.Char.Races;

namespace OniriumBE.Data.Seeders.DnD
{
    public class SeedRacialTraits
    {
        private static RacialTraits Create(string name, string description)
        {
            return new RacialTraits
            {
                Id = Guid.NewGuid(),
                Name = name,
                Description = description,
                IsCustom = false
            };
        }

        public static async Task SeedAsync(ApplicationDbContext context)
        {
            if (await context.RacialTraits.AnyAsync()) return;

            var model = new List<RacialTraits>
            {
                Create("Personalità Mutevole", "Vantaggio su prove di Inganno per impersonare altri."),
                Create("Passo Silenzioso", "Passare senza far rumore anche quando corri."),
                Create("Cambiare Forma", "Cambia aspetto fisico come azione."),
                Create("Aumento del punteggio di caratteristica", "Il tuo punteggio di Forza aumenta di 2."),
                Create("Duro come la Roccia", "+1 PF per ogni livello."),
                Create("Agilità Naturale", "Puoi muoverti attraverso spazi occupati da creature più grandi."),
                Create("Minacciosità", "Competenza nell'abilità Intimidire."),
                Create("Fortuna Halfling", "Rigira i 1 sui d20 per tiri di abilità, attacco o salvezza."),
                Create("Resistenza Celestiale", "Resistenza a danni necrotici e radianti."),
                Create("Resistenza Infernale", "Resistenza ai danni da fuoco."),
                Create("Versatilità", "+2 a Carisma e +1 a due altre caratteristiche a scelta."),
                Create("Potenza dei Giganti", "Sollevi il doppio del peso normale."),
                Create("Eredità di Asmodeo", "Impara i trucchetti Thaumaturgy e Oscurità, e l'incantesimo Comando."),
                Create("Addestramento all'armatura nanica", "Hai competenza con l'armatura leggera e media."),
                Create("Trascendenza Feerica", "Vantaggio contro incantesimi che causano charm e immunità al sonno magico."),
                Create("Ascendenza fatata", "Hai vantaggio nei tiri salvezza contro l'essere ammaliato e la magia non può farti addormentare."),
                Create("Resistenza Draconica ", "Resistenza a un tipo di danno basato sul colore del drago."),
                Create("Attacco Selvaggio", "Bonus ai danni con armi da mischia."),
                Create("Trucchetto Elfico", "Conosci un trucchetto dalla lista del mago."),
                Create("Soffio Draconico", "Soffio di energia (tipo basato sull'antenato draconico). Danni: 2d6."),
                Create("Eredità Feerica", "Vantaggio contro incantesimi che causano charm e immunità al sonno magico."),
                Create("Magia della Notte", "Conosci il trucchetto Danza delle Luci e puoi lanciare Oscurità una volta al giorno."),
                Create("Visione Crepuscolare", "Vedi fino a 24 metri nella luce fioca come se fosse luce intensa."),
                Create("Scurovisione ", "Puoi vedere in penombra entro 18mt da te come se fosse luce intensa, e nell'oscurità come se fosse penombra. Non puoi distinguere i colori nell'oscurità, solo le sfumature di grigio."),
                Create("Addestramento al combattimento nanico", "Hai competenza con l'ascia da battaglia, l'ascia a mano, il martello da lancio e il martello da guerra."),
                Create("Padronanza con Ascia da Guerra (Nano della Montagna)", "Competenza con asce da battaglia e martelli da guerra."),
                Create("Robustezza Nanica", "+2 alla Costituzione."),
                Create("Resilienza nanica", "Hai vantaggio nei tiri salvezza contro il veleno e hai resistenza contro i danni da veleno."),
                Create("Resistenza nanica", "Il tuo massimo di punti ferita aumenta di 1 e aumenta di 1 ogni volta che aumenti di livello."),
                Create("Stonecunning", "Ogni volta che effettui una prova di Intelligenza (Storia) relativa all'origine della lavorazione della pietra, sei considerato competente nell'abilità Storia e aggiungi il doppio del tuo bonus di competenza alla prova, invece del tuo normale bonus di competenza."),
                Create("Pelle di Pietra", "Resistenza ai danni da freddo."),
                Create("Trasformazione Protettiva", "Ali radianti che concedono volo e danni radianti aggiuntivi."),
                Create("Necrotic Shroud", "Aura di paura e danni necrotici aggiuntivi."),
                Create("Illusionista Nato", "Impara il trucchetto Minore Illusione."),
                Create("Artigiano Esperto", "Raddoppia la competenza con strumenti da artigiano."),
                Create("Sensi acuti", "Hai competenza nell'abilità Percezione."),
                Create("Aumento del punteggio di caratteristica", "Il tuo punteggio di Destrezza aumenta di 2."),
                Create("Versatilità Umana", "+1 a tutti i punteggi di caratteristica."),
                Create("Talento Variante", "Ottieni un talento a scelta e +1 a due caratteristiche."),
                Create("Aumento del punteggio di caratteristica", "Il tuo punteggio di Costituzione aumenta di 2."),
                Create("Aumento del punteggio di caratteristica", "Il tuo punteggio di saggezza aumenta di 1."),
                Create("Artigli Draconici", "Ottieni artigli naturali (1d6 danni) e +1 a Forza o Carisma."),
                Create("Anima del Drago", "Resistenza a un tipo di danno elementale."),
                Create("Presenza Rassicurante", "Vantaggio su prove di Carisma con chi è più piccolo di te.")
            };

            await context.RacialTraits.AddRangeAsync(model);
            await context.SaveChangesAsync();
        }
    }
}
