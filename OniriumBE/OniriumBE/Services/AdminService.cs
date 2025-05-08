using System.Linq;
using Microsoft.EntityFrameworkCore;
using OniriumBE.Data;
using OniriumBE.DTOs.AttackSpells;
using OniriumBE.DTOs.Background;
using OniriumBE.DTOs.Character;
using OniriumBE.DTOs.Class;
using OniriumBE.DTOs.Races;
using OniriumBE.Models.AttackSpells;
using OniriumBE.Models.Char;
using OniriumBE.Models.Char.Backgrounds;
using OniriumBE.Models.Char.Classes;
using OniriumBE.Models.Char.Races;
using Serilog;

namespace OniriumBE.Services
{
    public class AdminService
    {
        private ApplicationDbContext _context;
        private ShareServices _services;

        public AdminService(ApplicationDbContext context, ShareServices services)
        {
            _context = context;
            _services = services;
        }
        public async Task<List<SkillDto>?> GetAllSkill()
        {
            try
            {
                return await _context.Skills
                    .Include(s => s.Stat)
                .Select(s => new SkillDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description,
                    Stat = s.Stat.Name,
                })
                .ToListAsync();

            }
            catch
            {
                return null;
            }
        }
        public async Task<List<StatsDto>?> GetAllStats()
        {
            try
            {
                return await _context.Stats
                .Select(s => new StatsDto
                {
                    Id = s.Id,
                    Name = s.Name
                })
                .ToListAsync();

            }
            catch
            {
                return null;
            }
        }
        public async Task<bool> NewSkill(Skill model)
        {
            try
            {
                _context.Skills.Add(model);

                return await _services.SaveAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Errore durante la creazione dell'abilità", model.Id);
                return false;
            }
        }
        public async Task<bool> New(Class model)
        {
            try
            {
                _context.Classes.Add(model);

                return await _services.SaveAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Errore durante la creazione della classe", model.Id);
                return false;
            }
        }
        public async Task<List<ClassDto>?> GetAllClasses()
        {
            try
            {
                var result = await _context.Classes
                    .Include(c => c.Subclasses)
                    .ThenInclude(sc => sc.TraitAssignments)
                    .ThenInclude(ta => ta.Trait)
                    //.Include(c => c.TraitAssignments)
                    //.ThenInclude(ta => ta.Trait)
                    //.Include(c=>c.ClassProficiencies)
                    //.ThenInclude(cp => cp.Proficiency)
                    .AsNoTracking()
                    .ToListAsync();

                return result.Select(s => new ClassDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Image = s.Image,
                    ImageSemplifier = s.ImageSemplifier,
                    Description = s.Description,
                    RequiredLevelForSubclass = s.RequiredLevelForSubclass,
                    Subclasses = s.Subclasses.Select(ss => new SubclassDto
                    {
                        Id = ss.Id,
                        Name = ss.Name,
                        Traits = ss.TraitAssignments.Select(ta => new ClassFeatureDto
                        {
                            Id = ta.Trait.Id,
                            Name = ta.Trait.Name,
                            Description = ta.Trait.Description
                        }).ToList()
                    }).ToList(),
                    //Traits = s.TraitAssignments.Select(tsa => new ClassFeatureDto
                    //{
                    //    Id = tsa.Trait.Id,
                    //    Name = tsa.Trait.Name,
                    //    Description = tsa.Trait.Description
                    //}).ToList(),
                    //Proficiencies = s.ClassProficiencies.Select(cp => new ProficiencisDto
                    //{
                    //    Name = cp.Proficiency.Type.ToString(),
                    //    Description = cp.Proficiency.Description
                    //}).ToList(),
                }).ToList();
            }
            catch
            {
                return null;
            }
        }

        public async Task<List<ClassDto>> GetSelectedClassesAndSubclassesAsync(List<Guid> classIds, List<Guid> subclassIds)
        {

            var baseClasses = await _context.Classes
                .Where(c => classIds.Contains(c.Id))
                .Include(c => c.TraitAssignments)
                    .ThenInclude(ta => ta.Trait)
                .Include(c => c.ClassProficiencies)
                    .ThenInclude(cp => cp.Proficiency)
                .AsNoTracking()
                .ToListAsync();


            var subclasses = await _context.Subclasses
                .Where(sc => subclassIds.Contains(sc.Id))
                .Include(sc => sc.TraitAssignments)
                    .ThenInclude(ta => ta.Trait)
                .AsNoTracking()
                .ToListAsync();


            var result = baseClasses.Select(c => new ClassDto
            {
                Id = c.Id,
                Name = c.Name,
                Image = c.Image,
                ImageSemplifier = c.ImageSemplifier,
                Description = c.Description,
                RequiredLevelForSubclass = c.RequiredLevelForSubclass,
                Traits = c.TraitAssignments.Select(ta => new ClassFeatureDto
                {
                    Id = ta.Trait.Id,
                    Name = ta.Trait.Name,
                    Description = ta.Trait.Description
                }).ToList(),
                Proficiencies = c.ClassProficiencies.Select(cp => new ProficiencisDto
                {
                    Name = cp.Proficiency.Type.ToString(),
                    Description = cp.Proficiency.Description
                }).ToList(),
                Subclasses = subclasses
                    .Where(sc => sc.ClassId == c.Id)
                    .Select(sc => new SubclassDto
                    {
                        Id = sc.Id,
                        Name = sc.Name,
                        Traits = sc.TraitAssignments.Select(ta => new ClassFeatureDto
                        {
                            Id = ta.Trait.Id,
                            Name = ta.Trait.Name,
                            Description = ta.Trait.Description
                        }).ToList()
                    }).ToList()
            }).ToList();

            return result;
        }
        public async Task<List<TraitsDto>> GetAvailableTraitsAsync(TraitQueryModel model)
        {
            var traits = new List<TraitsDto>();

            // Razza
            traits.AddRange(await _context.RaceTraitAssignment
                .Where(rt => rt.RaceId == model.RaceId)
                .Select(rt => new TraitsDto
                {
                    Id = rt.Trait.Id,
                    Name = rt.Trait.Name,
                    Description = rt.Trait.Description,
                    Source = TraitSource.Race,
                    SourceId = model.RaceId,
                    IsAvailable = true
                }).ToListAsync());

            // Subrazza
            if (model.SubraceId.HasValue)
            {
                traits.AddRange(await _context.RaceTraitAssignment
                    .Where(rt => rt.SubraceId == model.SubraceId)
                    .Select(rt => new TraitsDto
                    {
                        Id = rt.Trait.Id,
                        Name = rt.Trait.Name,
                        Description = rt.Trait.Description,
                        Source = TraitSource.Subrace,
                        SourceId = model.SubraceId,
                        IsAvailable = true
                    }).ToListAsync());
            }

            // Background
            traits.AddRange(await _context.BackgroundPrivilegeAssignment
                .Where(bg => bg.BackgroundId == model.BackgroundId)
                .Select(bg => new TraitsDto
                {
                    Id = bg.Trait.Id,
                    Name = bg.Trait.Name,
                    Description = bg.Trait.Description,
                    Source = TraitSource.Background,
                    SourceId = model.BackgroundId,
                    IsAvailable = true
                }).ToListAsync());

            // Classi e sottoclassi
            foreach (var cls in model.ClassAssignments)
            {
                var allClassTraits = await _context.ClassFeaturesAssignments
                    .Where(a => a.ClassId == cls.Id && a.Trait != null)
                    .Select(a => new TraitsDto
                    {
                        Id = a.Trait.Id,
                        Name = a.Trait.Name,
                        Description = a.Trait.Description,
                        Source = TraitSource.Class,
                        SourceId = a.ClassId,
                        LevelRequired = a.Trait.LevelRequired,
                        IsAvailable = a.Trait.LevelRequired <= cls.LevelInClass
                    }).ToListAsync();

                traits.AddRange(allClassTraits);

                if (cls.Subclass.HasValue)
                {
                    var allSubclassTraits = await _context.ClassFeaturesAssignments
                        .Where(a => a.SubclassId == cls.Subclass && a.Trait != null)
                        .Select(a => new TraitsDto
                        {
                            Id = a.Trait.Id,
                            Name = a.Trait.Name,
                            Description = a.Trait.Description,
                            SourceId = a.SubclassId,
                            Source = TraitSource.Subclass,
                            LevelRequired = a.Trait.LevelRequired,
                            IsAvailable = a.Trait.LevelRequired <= cls.LevelInClass
                        }).ToListAsync();

                    traits.AddRange(allSubclassTraits);
                }
            }

            return traits;
        }

        public async Task<List<RaceDto>?> GetAllRaces()
        {
            try
            {
                var result = await _context.Races
                    .Include(c => c.Subraces)
                    .ThenInclude(sc => sc.TraitAssignments)
                    .ThenInclude(ta => ta.Trait)
                    .Include(c => c.TraitAssignments)
                    .ThenInclude(ta => ta.Trait)
                    .AsNoTracking()
                    .ToListAsync();

                return result.Select(s => new RaceDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description,
                    Subraces = s.Subraces.Select(ss => new SubraceDto
                    {
                        Id = ss.Id,
                        Name = ss.Name,
                        Traits = ss.TraitAssignments.Select(ta => new RacialTraitDto
                        {
                            Id = ta.Trait.Id,
                            Name = ta.Trait.Name,
                            Description = ta.Trait.Description
                        }).ToList()
                    }).ToList(),
                    Traits = s.TraitAssignments.Select(tsa => new RacialTraitDto
                    {
                        Id = tsa.Trait.Id,
                        Name = tsa.Trait.Name,
                        Description = tsa.Trait.Description
                    }).ToList()
                }).ToList();
            }
            catch
            {
                return null;
            }
        }
        public async Task<List<PrivilegesDto>?> GetAllPrivilees()
        {
            try
            {
                var result = await _context.BackgroundPrivilege
                    .ToListAsync();

                return result.Select(s => new PrivilegesDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description,
                    IsCustom = s.IsCustom
                }).ToList();
            }
            catch
            {
                return null;
            }
        }
        public async Task<bool> NewTrait(List<BackgroundPrivilege> model)
        {
            try
            {
                _context.BackgroundPrivilege.AddRange(model);

                return await _services.SaveAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Errore durante la creazione del tratto/abilità", model);
                return false;
            }
        }
        public async Task<List<FeaturesDto>?> GetAllFeatures()
        {
            try
            {
                var result = await _context.ClassFeatures
                    .ToListAsync();

                return result.Select(s => new FeaturesDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description,
                    IsCustom = s.IsCustom
                }).ToList();
            }
            catch
            {
                return null;
            }
        }
        public async Task<bool> NewFeature(List<ClassFeatures> model)
        {
            try
            {
                _context.ClassFeatures.AddRange(model);

                return await _services.SaveAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Errore durante la creazione del tratto/abilità", model);
                return false;
            }
        }
        public async Task<List<TraitsDto>?> GetAllRacialTraits()
        {
            try
            {
                var result = await _context.RacialTraits
                    .ToListAsync();

                return result.Select(s => new TraitsDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description,
                    IsCustom = s.IsCustom
                }).ToList();
            }
            catch
            {
                return null;
            }
        }
        public async Task<bool> NewRacialTrait(List<RacialTraits> model)
        {
            try
            {
                _context.RacialTraits.AddRange(model);

                return await _services.SaveAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Errore durante la creazione del tratto/abilità", model);
                return false;
            }
        }
        public async Task<bool> UpdateBackgroundPrivileges(Guid backgroundId, List<Guid> privilegeIds)
        {
            try
            {
                var background = await _context.Backgrounds
                    .Include(b => b.BackgroundPrivileges)
                    .FirstOrDefaultAsync(b => b.Id == backgroundId);

                if (background == null)
                    return false;

                var privileges = await _context.BackgroundPrivilege
                    .Where(p => privilegeIds.Contains(p.Id))
                    .ToListAsync();
                background.BackgroundPrivileges = (ICollection<BackgroundPrivilegeAssignment>?)privileges;

                return await _services.SaveAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Errore durante l'aggiornamento dei privilegi del background", new { backgroundId, privilegeIds });
                return false;
            }
        }
        public async Task<List<BackroundDto>?> GetAllBg()
        {
            try
            {
                var result = await _context.Backgrounds
                    .Include(b => b.BackgroundSkills)!
                    .ThenInclude(bs => bs.Skill)
                    .ThenInclude(s => s.Stat)
                    .ToListAsync();

                return result.Select(s => new BackroundDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description,
                    IsCustom = s.IsCustom,
                    Skills = s.BackgroundSkills != null ? s.BackgroundSkills.Select(s => new SkillDto
                    {
                        Name = s.Skill.Name,
                        Description = s.Skill.Description,
                        IsCustom = s.Skill.IsCustom,
                        Stat = s.Skill.Stat.Name
                    }).ToList() : null,
                }).ToList();
            }
            catch
            {
                return null;
            }
        }
        public async Task<bool> NewBg(List<Background> model)
        {
            try
            {
                _context.Backgrounds.AddRange(model);

                return await _services.SaveAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Errore durante la creazione del background", model);
                return false;
            }
        }
    }
}
