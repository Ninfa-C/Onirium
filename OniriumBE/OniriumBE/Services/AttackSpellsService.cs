using Microsoft.EntityFrameworkCore;
using OniriumBE.Data;
using OniriumBE.DTOs.AttackSpells;
using OniriumBE.DTOs.Class;
using OniriumBE.Models.AttackSpells;
using Serilog;

namespace OniriumBE.Services
{
    public class AttackSpellsService
    {
        private ApplicationDbContext _context;
        private ShareServices _services;

        public AttackSpellsService(ApplicationDbContext context, ShareServices services)
        {
            _context = context;
            _services = services;
        }

        public async Task<bool> NewSpell(Spell model, List<SpellDamageDto>? damages = null)
        {
            try
            {
                _context.Spells.Add(model);

                if (damages != null && damages.Count > 0)
                {
                    foreach (var damage in damages)
                    {
                        var existingDamage = await _context.Damages
                            .FirstOrDefaultAsync(d => d.DamageDice == damage.DamageDice && d.DamageType == damage.DamageType);

                        if (existingDamage == null)
                        {
                            existingDamage = new Damage
                            {
                                DamageDice = damage.DamageDice,
                                DamageType = damage.DamageType
                            };

                            _context.Damages.Add(existingDamage);
                        }
                        var spellDamage = new SpellSpellDamage
                        {
                            SpellId = model.Id,
                            SpellDamageId = existingDamage.Id
                        };
                        _context.SpellSpellDamages.Add(spellDamage);
                    }
                }
                return await _services.SaveAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Errore durante la creazione dello spell {SpellId}", model.Id);
                return false;
            }
        }

        public async Task<List<SpellDTO>?> GetSpells(
            string? level = null,
            string? className = null,
            bool custom = false,
            string? multiClass = null)
        {
            try
            {
                var query = _context.Spells
                    .Include(s => s.Level)
                    .Include(s => s.Cost)
                    .Include(s => s.Components)
                    .Include(s => s.Duration)
                    .Include(s => s.School)
                    .Include(s => s.SavingThrow)
                    .Include(s => s.SpellSpellDamages)
                        .ThenInclude(sd => sd.SpellDamage)
                    .Include(s => s.ClassSpell)
                        .ThenInclude(ssc => ssc.Class)
                    .AsQueryable();

                int parsedLevel = int.TryParse(level, out var lvl) ? lvl : 0;

                List<Spell> preFiltered = new();

                if (custom)
                {
                    // Se custom è true, prendi tutti gli incantesimi di quel livello
                    preFiltered = await query
                        .Where(s => string.IsNullOrEmpty(level) || (s.Level != null && s.Level.Level == level))
                        .AsNoTracking()
                        .ToListAsync();
                }
                else if (!string.IsNullOrEmpty(multiClass))
                {
                    var classFilters = multiClass.Split(',')
                        .Select(mc =>
                        {
                            var parts = mc.Split(':');
                            return new
                            {
                                Name = parts[0],
                                Level = int.TryParse(parts[1], out int pl) ? pl : 0
                            };
                        }).ToList();

                    var allSpells = await query
                        .Where(s => s.ClassSpell.Any())
                        .AsNoTracking()
                        .ToListAsync();

                    preFiltered = allSpells
                        .Where(s =>
                            s.ClassSpell.Any(cs =>
                                classFilters.Any(cf =>
                                    cf.Name.Equals(cs.Class.Name, StringComparison.OrdinalIgnoreCase) &&
                                    cs.RequiredClassLevel <= cf.Level
                                )
                            ) &&
                            (string.IsNullOrEmpty(level) || (s.Level != null && s.Level.Level == level))
                        )
                        .ToList();
                }
                else
                {
                    if (!string.IsNullOrEmpty(className))
                    {
                        query = query.Where(s =>
                            s.ClassSpell.Any(cs =>
                                cs.Class.Name.Equals(className, StringComparison.OrdinalIgnoreCase) &&
                                cs.RequiredClassLevel <= parsedLevel));
                    }
                    else
                    {
                        query = query.Where(s =>
                            s.ClassSpell.Any(cs => cs.RequiredClassLevel <= parsedLevel));
                    }

                    preFiltered = await query
                        .Where(s => string.IsNullOrEmpty(level) || (s.Level != null && s.Level.Level == level))
                        .AsNoTracking()
                        .ToListAsync();
                }

                return preFiltered.Select(s => new SpellDTO
                {
                    Id = s.Id,
                    Name = s.Name,
                    Level = s.Level?.Level ?? "Unknown",
                    School = s.School?.Name ?? "Unknown",
                    IsConcentration = s.IsConcentration,
                    IsRitual = s.IsRitual,
                    Description = s.Description,
                    ExtraDescription = s.ExtraDescription ?? string.Empty,
                    Cost = s.Cost.Cost,
                    SavingThrowId = s.SavingThrow?.Name,
                    Components = s.Components.Name,
                    Duration = s.Duration.Name,
                    Range = s.Range,
                    Damage = s.SpellSpellDamages?.Select(sd => new SpellDamageDto
                    {
                        Id = sd.SpellDamage?.Id ?? Guid.Empty,
                        DamageDice = sd.SpellDamage?.DamageDice ?? "Unknown",
                        DamageType = sd.SpellDamage?.DamageType ?? "Unknown"
                    }).ToList() ?? new List<SpellDamageDto>(),
                    Classes = s.ClassSpell?.Select(cs => new ClassSpellShowInfo
                    {
                        Id = cs.Id,
                        Name = cs.Class.Name,
                        RequiredLevel = cs.RequiredClassLevel,
                    }).ToList() ?? new List<ClassSpellShowInfo>(),
                }).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine("ERRORE:", ex.Message);
                return null;
            }
        }


        public async Task<SpellDTO?> GetSpellById(Guid id)
        {
            try
            {                
                var spell = await _context.Spells
                    .Include(s => s.Level)
                    .Include(s => s.Cost)
                    .Include(s => s.Components)
                    .Include(s => s.Duration)
                    .Include(s => s.School)
                    .Include(s => s.SavingThrow)
                    .Include(s => s.SpellSpellDamages)
                        .ThenInclude(sd => sd.SpellDamage)
                    .Include(s => s.ClassSpell)
                        .ThenInclude(ssc => ssc.Class)
                    .AsNoTracking()
                    .FirstOrDefaultAsync(s => s.Id == id);

                if (spell == null)
                {
                    return null;
                }

                return new SpellDTO
                {
                    Id = spell.Id,
                    Name = spell.Name,
                    Level = spell.Level?.Level ?? "Unknown",
                    School = spell.School?.Name ?? "Unknown",
                    IsConcentration = spell.IsConcentration,
                    IsRitual = spell.IsRitual,
                    Description = spell.Description,
                    ExtraDescription = spell.ExtraDescription ?? string.Empty,
                    Cost = spell.Cost.Cost,
                    SavingThrowId = spell.SavingThrow?.Name,
                    Components = spell.Components.Name,
                    Duration = spell.Duration.Name,
                    Range = spell.Range,
                    Damage = spell.SpellSpellDamages?.Select(sd => new SpellDamageDto
                    {
                        Id = sd.SpellDamage?.Id ?? Guid.Empty,
                        DamageDice = sd.SpellDamage?.DamageDice ?? "Unknown",
                        DamageType = sd.SpellDamage?.DamageType ?? "Unknown"
                    }).ToList() ?? new List<SpellDamageDto>(),
                    Classes = spell.ClassSpell?.Select(cs => new ClassSpellShowInfo
                    {
                        Id = cs.Id,
                        Name = cs.Class.Name,
                        RequiredLevel = cs.RequiredClassLevel,
                    }).ToList() ?? new List<ClassSpellShowInfo>(),
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine("ERRORE:", ex.Message);
                return null;
            }
        }
    }
}
