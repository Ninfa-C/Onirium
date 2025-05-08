using Microsoft.EntityFrameworkCore;
using OniriumBE.Models.AttackSpells;
using OniriumBE.Models.Char.Backgrounds;
using OniriumBE.Models.Char.Classes;
using static System.Net.Mime.MediaTypeNames;

namespace OniriumBE.Data.Seeders.DnD
{
    public class SeedClassesAndSubclasses
    {
        private static Class Create(string name, string description, int level, string image, string imageSemplified)
        {
            return new Class
            {
                Id = Guid.NewGuid(),
                Name = name,
                Description = description,
                RequiredLevelForSubclass = level,
                Image = image,
                ImageSemplifier = imageSemplified,
                IsCustom = false
            };
        }
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            //context.ClassFeaturesAssignments.RemoveRange(await context.ClassFeaturesAssignments.ToListAsync());
            //context.Subclasses.RemoveRange(await context.Subclasses.ToListAsync());
            //context.Classes.RemoveRange(await context.Classes.ToListAsync());
            //await context.SaveChangesAsync();
            if (await context.Classes.AnyAsync()) return;

            var classes = new List<Class>
            {
               Create("Barbaro","Combattente feroce che canalizza la rabbia in battaglia", 3, "assets/class/barbarianBg.png", "assets/class/NoBg/barbarian.png"),
               Create ("Guerriero", "Combattente esperto in battaglia con varie specializzazioni", 3, "assets/class/fighterBg.png","assets/class/NoBg/fighter.png" ),
               Create("Ladro","Esperto in furtività, acrobazie e scassinamento", 3, "assets/class/rogueBg.png","assets/class/NoBg/rogue.png" ),
               Create("Monaco", "Combattente che usa tecniche fisiche e spirituali",3,"assets/class/monkBg.png","assets/class/NoBg/monk.png" ),
               Create("Paladino", "Guerriero sacro che giura di proteggere il bene",3, "assets/class/paladinBg.png","assets/class/NoBg/paladin.png"),
               Create("Ranger", "Esploratore esperto nel combattimento a distanza e nelle terre selvagge", 3, "assets/class/rangerBg.png","assets/class/NoBg/ranger.png" ),
               Create("Artefice",  "Mago che usa l'ingegneria e la magia per creare oggetti magici",  3, "assets/class/artificierBg.png","assets/class/NoBg/artificier.png"),
               Create("Bardo", "Incantatore che usa la musica per ispirare e lanciare incantesimi", 3, "assets/class/bardBg.png","assets/class/NoBg/bard.png" ),
               Create("Chierico", "Incantatore che trae il suo potere da una divinità", 3, "assets/class/clericBg.png","assets/class/NoBg/cleric.png" ),
               Create("Druido",  "Mago della natura con il potere di trasformarsi in animali",  3, "assets/class/druidBg.png","assets/class/NoBg/druid.png" ),
               Create("Mago", "Incantatore che studia le arti arcane per ottenere poteri magici",  3, "assets/class/wizardBg.png","assets/class/NoBg/wizard.png" ),
               Create("Stregone", "Incantatore che possiede poteri innati derivanti da un legame con una forza magica",  3, "assets/class/sorcererBg.png","assets/class/NoBg/sorcerer.png"),
               Create("Warlock", "Incantatore che ottiene potere tramite un patto con una entità misteriosa", 3, "assets/class/warlockBg.png","assets/class/NoBg/warlock.png" ),
            };
            await context.Classes.AddRangeAsync(classes);
            await context.SaveChangesAsync();

            context.Subclasses.RemoveRange(await context.Subclasses.ToListAsync());
            await context.SaveChangesAsync();
            var suclasses = new List<Subclass>();
            var associations = new Dictionary<string, string[]>
            {
                ["Barbaro"] = ["Cammino del Berserker", "Cammino del combattente totemico", "Cammino del guardiano ancestrale", "Cammino dell'araldo della tempesta", "Cammino dello Zelota", "Cammino della Bestia", "Cammino della Magia Selvaggia"],
                ["Guerriero"] = ["Maestro di Battaglia", "Campione", "Arciere Arcano", "Cavaliere Errante", "Cavaliere Mistico", "Samurai ", "Guerriero Psionico ", "Guerriero Runico"],
                ["Ladro"] = ["Furfante", "Assassino", "Indagatore ", "Mistificatore Arcano", "Pianificatore ", "Esploratore ", "Spadaccino ", "Fantasma", "Lama Spirituale"],
                ["Monaco"] = ["Via della Mano Aperta", "Via dell’ Ombra", "Via dei Quattro Elementi", "Via del Maestro Ubriaco", "Via del Kensei ", "Via dell’Anima Solare", "Via della Misericordia", "Via del sè astrale"],
                ["Paladino"] = ["Giuramento della Vendetta", "Giuramento della Devozione", "Giuramento degli Antichi", "Giuramento della Conquista", "Giuramento della Redenzione", "Giuramento dell'Apostata", "Giuramento della Gloria", "Giuramento delle Sentinelle"],
                ["Ranger"] = ["Cacciatore", "Cacciatore delle Tenebre", "Viandante dell’Orizzonte", "Uccisore di Mostri", "Signore delle Bestie", "Viandante Fatato", "Custode degli Sciami"],
                ["Artefice"] = ["Alchimista", "Artigliere", "Fabbro da battaglia", "Armaiolo"],
                ["Bardo"] = ["Collegio del fascino", "Collegio della sapienza", "Collegio del valore", "Collegio dei sussurri", "Collegio dell'eloquenza", "Collegio della creazione", "Collegio della spada"],
                ["Chierico"] = ["Dominio della Luce", "Dominio dell'Ordine", "Dominio della Pace", "Dominio del Crepuscolo", "Dominio della Conoscenza", "Dominio della Forgia", "Dominio della Guerra", "Dominio dell'Inganno", "Dominio della Morte", "Dominio della natura", "Dominio della Tempesta", "Dominio della Tomba", "Dominio della Vita"],
                ["Druido"] = ["Circolo della Luna", "Circolo del Pastore", "Circolo dei Sogni", "Circolo della Terra", "Circolo delle Stelle", "Circolo delle Spore", "Circolo della Fiamma"],
                ["Mago"] = ["Scuola dell'Evocazione", "Scuola dell'Abiurazione", "Cantore della Lama", "Scuola della Divinazione", "Scuola dell'Illusione", "Scuola dell'Invocazione", "Scuola della Necromanzia", "Scuola della Trasmutazione", "Magia della Guerra", "Scuola dell'Ammaliamento", "Ordine degli Scribi"],
                ["Stregone"] = ["Discendenza Draconica", "Anima Divina", "Magia Selvaggia", "Magia delle Ombre", "Stregoneria della Tempesta", "Mente Aberrante", "Anima Meccanica"],
                ["Warlock"] = ["Patto del celestiale", "Patto del Signore Fatato", "Patto dell'Immondo", "Patto del Grande Antico", "Patto della Lama del Sortilegio", "Patto dell'Insondabile", "Patto del Genio"]
            };

            foreach (var (classE, subClasses) in associations)
            {
                var classe = classes.FirstOrDefault(b => b.Name == classE);

                foreach (var item in subClasses)
                {
                    suclasses.Add(new Subclass
                    {
                        Id = Guid.NewGuid(),
                        Name = item,
                        ClassId = classe!.Id,
                        IsCustom = false,
                    });
                }
            }
            await context.Subclasses.AddRangeAsync(suclasses);
            await context.SaveChangesAsync();

        }
    }
}
