using System.Diagnostics;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using OniriumBE.Data;
using OniriumBE.DTOs.AttackSpells;
using OniriumBE.DTOs.Background;
using OniriumBE.DTOs.Character;
using OniriumBE.DTOs.Class;
using OniriumBE.DTOs.Inventory;
using OniriumBE.DTOs.ItemsDtos;
using OniriumBE.DTOs.ItemsDtos.ShowInfoModels;
using OniriumBE.DTOs.Races;
using OniriumBE.Models.Char;
using OniriumBE.Models.Char.Classes;
using OniriumBE.Models.Items;
using Serilog;

namespace OniriumBE.Services
{
    public class CharacterServices
    {
        private ApplicationDbContext _context;
        private ShareServices _services;

        public CharacterServices(ApplicationDbContext context, ShareServices services)
        {
            _context = context;
            _services = services;
        }

        public async Task<List<CharacterDto>> GetAllChars()
        {
            try
            {
                var characters = await _context.Characters
                    .Include(c => c.Background)
                        .ThenInclude(b => b.BackgroundSkills!)
                            .ThenInclude(bs => bs.Skill)
                            .ThenInclude(s => s.Stat)
                    .Include(c => c.Race)
                        .ThenInclude(r => r.TraitAssignments)
                            .ThenInclude(ta => ta.Trait)
                    .Include(c => c.Subrace)
                        .ThenInclude(sr => sr.TraitAssignments)
                            .ThenInclude(ta => ta.Trait)
                    .Include(c => c.ClassAssignments)
                        .ThenInclude(ca => ca.Class)
                            .ThenInclude(cl => cl.TraitAssignments)
                                .ThenInclude(ta => ta.Trait)
                    .Include(c => c.ClassAssignments)
                        .ThenInclude(ca => ca.Subclass)
                            .ThenInclude(sc => sc.TraitAssignments)
                                .ThenInclude(ta => ta.Trait)
                    .Include(c => c.Stats)
                        .ThenInclude(cs => cs.Stat)
                    .Include(c => c.Skills)
                        .ThenInclude(cs => cs.Skill)
                    .Include(c => c.CharacterInventories)
                        .ThenInclude(ci => ci.InventoryItemAssignments)
                        .ThenInclude(cia => cia.InventoryItem)
                    .Include(c => c.CharacterSpells)
                        .ThenInclude(cs => cs.Spell)
                            .ThenInclude(s => s.Level)
                    .Include(c => c.CharacterSpells)
                        .ThenInclude(cs => cs.Spell)
                            .ThenInclude(s => s.Cost)
                    .Include(c => c.CharacterSpells)
                        .ThenInclude(cs => cs.Spell)
                            .ThenInclude(s => s.Components)
                    .Include(c => c.CharacterSpells)
                        .ThenInclude(cs => cs.Spell)
                            .ThenInclude(s => s.Duration)
                    .Include(c => c.CharacterSpells)
                        .ThenInclude(cs => cs.Spell)
                            .ThenInclude(s => s.School)
                    .Include(c => c.CharacterSpells)
                        .ThenInclude(cs => cs.Spell)
                            .ThenInclude(s => s.SavingThrow)
                    .Include(c => c.CharacterSpells)
                        .ThenInclude(cs => cs.Spell)
                            .ThenInclude(s => s.SpellSpellDamages)!
                                .ThenInclude(sd => sd.SpellDamage)
                    .AsNoTracking()
                    .ToListAsync();

                if (characters == null || !characters.Any())
                {
                    return new List<CharacterDto>();
                }

                var dtos = characters.Select(existing => new CharacterDto()
                {
                    Id = existing.Id,
                    Name = existing.Name,
                    Image = existing.Image,
                    LifePoints = existing.LifePoints,
                    Background = new BackroundDto
                    {
                        Id = existing.Background.Id,
                        Name = existing.Background.Name,
                        Description = existing.Background.Description,
                        IsCustom = existing.Background.IsCustom,
                        Skills = existing.Background.BackgroundSkills?.Select(bs => new SkillDto
                        {
                            Id = bs.Skill.Id,
                            Name = bs.Skill.Name,
                            Description = bs.Skill.Description,
                            Stat = bs.Skill.Stat.Name,
                            IsCustom = bs.Skill.IsCustom
                        }).ToList()
                    },
                    Race = new RaceDto
                    {
                        Id = existing.Race.Id,
                        Name = existing.Race.Name,
                        Description = existing.Race.Description,
                        Traits = existing.Race.TraitAssignments.Select(tsa => new RacialTraitDto
                        {
                            Id = tsa.Trait.Id,
                            Name = tsa.Trait.Name,
                            Description = tsa.Trait.Description
                        }).ToList()
                    },
                    Subrace = existing.Subrace == null ? null : new SubraceDto
                    {
                        Id = existing.Subrace.Id,
                        Name = existing.Subrace.Name,
                        Traits = existing.Race.TraitAssignments.Select(tsa => new RacialTraitDto
                        {
                            Id = tsa.Trait.Id,
                            Name = tsa.Trait.Name,
                            Description = tsa.Trait.Description
                        }).ToList()
                    },
                    Class = existing.ClassAssignments.Select(ca => new CharClassInfoShow
                    {
                        Name = ca.Class.Name,
                        Level = ca.LevelInClass,
                        SubClass = ca.Subclass.Name
                    }).ToList(),
                    Level = existing.Level,
                    ProficiencyBonus = existing.ProficiencyBonus,
                    Stats = existing.Stats.Select(s => new CharacterStatDto
                    {
                        Name = s.Stat.Name,
                        Value = s.Value,
                    }).ToList(),
                    Spells = existing.CharacterSpells.Select(cs => new CharSpellInfo
                    {
                        Id = cs.Spell.Id,
                        Name = cs.Spell.Name,
                        SpellLevel = cs.Spell.Level.Level,
                        IsPrepared = cs.IsPrepared,
                        School = cs.Spell.School?.Name ?? "Unknown",
                        IsConcentration = cs.Spell.IsConcentration,
                        IsRitual = cs.Spell.IsRitual,
                        Description = cs.Spell.Description,
                        ExtraDescription = cs.Spell.ExtraDescription ?? string.Empty,
                        Cost = cs.Spell.Cost.Cost,
                        SavingThrowId = cs.Spell.SavingThrow?.Name,
                        Components = cs.Spell.Components.Name,
                        Duration = cs.Spell.Duration.Name,
                        Range = cs.Spell.Range,
                        Damage = cs.Spell.SpellSpellDamages?.Select(sd => new SpellDamageDto
                        {
                            Id = sd.SpellDamage?.Id ?? Guid.Empty,
                            DamageDice = sd.SpellDamage?.DamageDice ?? "Unknown",
                            DamageType = sd.SpellDamage?.DamageType ?? "Unknown"
                        }).ToList() ?? new List<SpellDamageDto>()
                    }).ToList(),
                    Inventory = existing.CharacterInventories.Select(ci => new CharacterInventoryDto
                    {
                        MaxWeight = ci.MaxWeight,
                        Items = ci.InventoryItemAssignments.Select(iia => new InventoryItemAssignmentDto
                        {
                            IsEquiped = iia.IsEquiped,
                            Quantity = iia.Quantity,
                        }).ToList() ?? new List<InventoryItemAssignmentDto>()
                    }).ToList()
                }).ToList();

                return dtos;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<bool> NewChar(CharacterCreateModel model, string userId)
        {
            // Quando faccio più azioni multiple, meglio usare transaction per avere consistenza nel codice ed evitare che aggiunga alcune cose e altre no
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                string webPath = null;
                if (model.Image != null)
                {
                    var fileName = model.Image.FileName;
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "assets", "characters", fileName);
                    await using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await model.Image.CopyToAsync(stream);
                    }
                    webPath = Path.Combine("assets", "images", fileName);
                }

                var character = new Character
                {
                    Id = Guid.NewGuid(),
                    Name = model.Name,
                    UserId = userId,
                    RaceId = model.RaceId,
                    SubraceId = model.SubraceId,
                    BackgroundId = model.BackgroundId,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow,
                    Image = webPath,
                    LifePoints = model.LifePoints
                };
                await _context.Characters.AddAsync(character);
                await _context.SaveChangesAsync();
                //STATS AGGIUNTA (FOR DEX ETC ETC)
                foreach (var item in model.Stats)
                {
                    var stat = await _context.Stats.FindAsync(item.StatId);
                    if (stat == null)
                    {
                        throw new Exception($"Stat with ID {item.StatId} does not exist");
                    }

                    var characterStats = new CharacterStats
                    {
                        Id = Guid.NewGuid(),
                        CharacterId = character.Id,
                        StatId = item.StatId,
                        Value = item.Value
                    };

                    _context.CharacterStats.Add(characterStats);
                }
                //SKILL AGGIUNTA CON IS PROFICIENT
                foreach (var item in model.Skills)
                {
                    var skill = await _context.Skills.FindAsync(item.SkillId);
                    if (skill == null)
                    {
                        throw new Exception($"Skill with ID {item.SkillId} does not exist");
                    }

                    var characterSkill = new CharacterSkill
                    {
                        Id = Guid.NewGuid(),
                        CharacterId = character.Id,
                        SkillId = item.SkillId,
                        IsProficient = item.IsProficient
                    };

                    _context.CharacterSkills.Add(characterSkill);
                }
                //INVENTARIO CON OGGETTI INSERITI
                var inventory = new CharacterInventory
                {
                    Id = Guid.NewGuid(),
                    CharacterId = character.Id,
                    MaxWeight = model.MaxWeight
                };
                _context.CharacterInventories.Add(inventory);
                if (model.Items != null && model.Items.Any())
                {
                    foreach (var item in model.Items)
                    {
                        var obj = await _context.Items.FindAsync(item.ItemId);
                        if (item == null)
                        {
                            throw new Exception($"Item with ID {item.ItemId} does not exist");
                        }

                        var inventoryItem = new InventoryItemAssignment
                        {
                            Id = Guid.NewGuid(),
                            InventoryId = inventory.Id,
                            InventoryItemId = item.ItemId,
                            Quantity = item.Quantity,
                            IsEquiped = item.IsEquiped,
                        };

                        _context.InventoryItemAssignments.Add(inventoryItem);
                    }
                }
                //AGGIUNTA CLASSE ed EVENTUALE SOTTOCLASSE
                foreach (var item in model.ClassAssignments)
                {
                    var characterClass = await _context.Classes.FindAsync(item.ClassId);
                    if (characterClass == null)
                    {
                        throw new Exception($"Class with ID {item.ClassId} does not exist");
                    }
                    if (item.SubclassId.HasValue)
                    {
                        var subclass = await _context.Subclasses.FindAsync(item.SubclassId.Value);
                        if (subclass == null || subclass.ClassId != item.ClassId)
                        {
                            throw new Exception($"Subclass with ID {item.SubclassId} does not exist or does not belong to the selected class");
                        }
                        if (item.LevelInClass < characterClass.RequiredLevelForSubclass)
                        {
                            throw new Exception($"Character needs at least {characterClass.RequiredLevelForSubclass} levels in {characterClass.Name} to select a subclass");
                        }
                    }

                    var classAssignment = new ClassAssignment
                    {
                        Id = Guid.NewGuid(),
                        CharacterId = character.Id,
                        ClassId = item.ClassId,
                        LevelInClass = item.LevelInClass,
                        SubclassId = item.SubclassId
                    };

                    _context.ClassAssignments.Add(classAssignment);
                }

                //AGGIUNT INCANTESIMI SE CI SONO!
                if (model.Spells != null && model.Spells.Any())
                {
                    foreach (var spell in model.Spells)
                    {
                        var characterSpell = new CharacterSpell
                        {
                            Id = Guid.NewGuid(),
                            CharacterId = character.Id,
                            SpellId = spell.SpellId,
                            IsPrepared = spell.IsPrepared
                        };

                        _context.CharacterSpells.Add(characterSpell);
                    }
                }
                //AGGIUNT TRATTI SE CI SONO!
                foreach (var trait in model.Traits)
                {
                    _context.CharacterTraits.Add(new CharacterTrait
                    {
                        Id = Guid.NewGuid(),
                        CharacterId = character.Id,
                        TraitId = trait.TraitId,
                        Source = trait.Source
                    });
                }

                await _services.SaveAsync();
                await transaction.CommitAsync();

                return true;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Errore durante la creazione del personaggio");
                return false;
            }
        }

        public async Task<List<CharacterDto>> GetUserChars(string userId)
        {
            try
            {
                var itemIds = await _context.CharacterInventories
                    .Where(ci => ci.Character.UserId == userId)
                    .SelectMany(ci => ci.InventoryItemAssignments.Select(iia => iia.InventoryItemId))
                    .Distinct()
                    .ToListAsync();

                var allItems = await _context.Items
                    .Where(i => itemIds.Contains(i.Id))
                    .Include(i => i.ItemCategory)
                    .Include(i => (i as Weapon).Damages).ThenInclude(d => d.Damage)
                    .Include(i => (i as Potion).Effects).ThenInclude(e => e.AffectedStatObject)
                    .Include(i => (i as MagicalItem).Effects).ThenInclude(e => e.AffectedStatObject)
                    .AsNoTracking()
                    .ToListAsync();

                var itemDictionary = allItems.ToDictionary(i => i.Id);

                var spellIds = await _context.CharacterSpells
                    .Where(sp => sp.Character.UserId == userId)
                    .Select(sp => sp.SpellId)
                    .Distinct()
                    .ToListAsync();

                var allSpells = await _context.Spells
                    .Where(s => spellIds.Contains(s.Id))
                    .Include(s => s.Level)
                    .Include(s => s.Cost)
                    .Include(s => s.Components)
                    .Include(s => s.Duration)
                    .Include(s => s.School)
                    .Include(s => s.SavingThrow)
                    .Include(s => s.SpellSpellDamages).ThenInclude(sd => sd.SpellDamage)
                    .AsNoTracking()
                    .ToListAsync();

                var spellDictionary = allSpells.ToDictionary(s => s.Id);

                var rawCharacters = await _context.Characters
                    .Where(c => c.UserId == userId)
                    .Select(c => new
                    {
                        c.Id,
                        c.Name,
                        c.Image,
                        c.LifePoints,
                        Background = new { c.Background.Id, c.Background.Name, c.Background.Description },
                        Race = new { c.Race.Id, c.Race.Name, c.Race.Description },
                        Subrace = c.Subrace != null ? new { c.Subrace.Id, c.Subrace.Name } : null,
                        Stats = c.Stats.Select(s => new { s.Stat.Name, s.Value }).ToList(),
                        ClassAssignments = c.ClassAssignments.Select(ca => new { ca.Class.Id, ca.Class.Name, ca.LevelInClass, Subclass = ca.Subclass != null ? new { ca.Subclass.Id, ca.Subclass.Name } : null }).ToList(),

                        Inventory = c.CharacterInventories.Select(inv => new
                        {
                            inv.MaxWeight,
                            Items = inv.InventoryItemAssignments.Select(iia => new { iia.InventoryItemId, iia.IsEquiped, iia.Quantity }).ToList()
                        }).ToList(),
                        Spells = c.CharacterSpells.Select(sp => new { sp.SpellId, sp.IsPrepared }).ToList()
                    })
                    .OrderBy(c => c.Name)
                    .AsNoTracking()
                    .ToListAsync();

                var characters = rawCharacters.Select(raw =>
                {
                    var totalLevel = raw.ClassAssignments.Sum(cl => cl.LevelInClass);
                    int proficiencyBonus = totalLevel switch
                    {
                        >= 1 and <= 4 => 2,
                        >= 5 and <= 8 => 3,
                        >= 9 and <= 12 => 4,
                        >= 13 and <= 16 => 5,
                        >= 17 and <= 20 => 6,
                        _ => 0
                    };

                    var dto = new CharacterDto
                    {
                        Id = raw.Id,
                        Name = raw.Name,
                        Image = raw.Image,
                        LifePoints = raw.LifePoints,
                        Level = totalLevel,
                        ProficiencyBonus = proficiencyBonus,
                        Background = new BackroundDto
                        {
                            Id = raw.Background.Id,
                            Name = raw.Background.Name,
                            Description = raw.Background.Description
                        },
                        Race = new RaceDto
                        {
                            Id = raw.Race.Id,
                            Name = raw.Race.Name,
                            Description = raw.Race.Description
                        },
                        Subrace = raw.Subrace != null ? new SubraceDto
                        {
                            Id = raw.Subrace.Id,
                            Name = raw.Subrace.Name
                        } : null,
                        Stats = raw.Stats.Select(s => new CharacterStatDto
                        {
                            Name = s.Name,
                            Value = s.Value
                        }).ToList(),
                        Class = raw.ClassAssignments.Select(cl => new CharClassInfoShow
                        {
                            Name = cl.Name,
                            Level = cl.LevelInClass,
                            SubClass = cl.Subclass != null ? cl.Subclass.Name : null
                        }).ToList(),
                        Inventory = raw.Inventory.Select(inv => new CharacterInventoryDto
                        {
                            MaxWeight = inv.MaxWeight,
                            Items = inv.Items.Select(iia =>
                            {
                                var realItem = itemDictionary.GetValueOrDefault(iia.InventoryItemId);
                                var itemDto = new InventoryItemAssignmentDto
                                {
                                    ItemId = iia.InventoryItemId,
                                    IsEquiped = iia.IsEquiped,
                                    Quantity = iia.Quantity,
                                    Name = realItem?.Name ?? "Unknown",
                                    Description = realItem?.Description ?? "",
                                    Weight = realItem?.Weight ?? 0,
                                    Value = realItem?.Value ?? 0,
                                    Category = realItem?.ItemCategory?.Name ?? "Unknown"
                                };
                                if (realItem is Weapon weapon)
                                {
                                    itemDto.Damages = weapon.Damages?.Select(d => new ItemDamageDto
                                    {
                                        DamageDice = d.Damage?.DamageDice ?? "Unknown",
                                        DamageType = d.Damage?.DamageType ?? "Unknown"
                                    }).ToList();
                                }
                                else if (realItem is Potion potion)
                                {
                                    itemDto.Effects = potion.Effects?.Select(e => new ItemEffectDto
                                    {
                                        EffectType = e.EffectType,
                                        Value = e.Value,
                                        Description = e.Description
                                    }).ToList();
                                }
                                else if (realItem is MagicalItem magicalItem)
                                {
                                    itemDto.Effects = magicalItem.Effects?.Select(e => new ItemEffectDto
                                    {
                                        EffectType = e.EffectType,
                                        Value = e.Value,
                                        Description = e.Description
                                    }).ToList();
                                }
                                return itemDto;
                            }).ToList()
                        }).ToList(),
                        Spells = raw.Spells.Select(sp =>
                        {
                            var realSpell = spellDictionary.GetValueOrDefault(sp.SpellId);
                            return new CharSpellInfo
                            {
                                Id = realSpell?.Id ?? Guid.Empty,
                                Name = realSpell?.Name ?? "Unknown",
                                SpellLevel = realSpell.Level?.Level,
                                IsPrepared = sp.IsPrepared,
                                School = realSpell?.School?.Name ?? "Unknown",
                                IsConcentration = realSpell?.IsConcentration ?? false,
                                IsRitual = realSpell?.IsRitual ?? false,
                                Description = realSpell?.Description,
                                ExtraDescription = realSpell?.ExtraDescription,
                                Cost = realSpell?.Cost?.Cost,
                                SavingThrowId = realSpell?.SavingThrow?.Name,
                                Components = realSpell?.Components?.Name,
                                Duration = realSpell?.Duration?.Name,
                                Range = realSpell?.Range,
                                Damage = realSpell?.SpellSpellDamages?.Select(sd => new SpellDamageDto
                                {
                                    Id = sd.SpellDamage?.Id ?? Guid.Empty,
                                    DamageDice = sd.SpellDamage?.DamageDice ?? "Unknown",
                                    DamageType = sd.SpellDamage?.DamageType ?? "Unknown"
                                }).ToList() ?? new List<SpellDamageDto>()
                            };
                        }).ToList()
                    };

                    return dto;
                }).ToList();

                return characters;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Errore in GetUserChars: {ex.Message}");
                return new List<CharacterDto>();
            }
        }

        public async Task<CharacterDto> GetCharacterById(Guid characterId)
        {
            try
            {
                var itemIds = await _context.CharacterInventories
                    .Where(ci => ci.CharacterId == characterId)
                    .SelectMany(ci => ci.InventoryItemAssignments.Select(iia => iia.InventoryItemId))
                    .Distinct()
                    .ToListAsync();

                var allItems = await _context.Items
                    .Where(i => itemIds.Contains(i.Id))
                    .Include(i => i.ItemCategory)
                    .Include(i => (i as Armor).Requirements).ThenInclude(ir => ir.Stats)
                    .Include(i => (i as Weapon).Damages).ThenInclude(d => d.Damage)
                    .Include(i => (i as Potion).Effects).ThenInclude(e => e.AffectedStatObject)
                    .Include(i => (i as MagicalItem).Effects).ThenInclude(e => e.AffectedStatObject)
                    .AsNoTracking()
                    .ToListAsync();

                var itemDictionary = allItems.ToDictionary(i => i.Id);

                var spellIds = await _context.CharacterSpells
                    .Where(sp => sp.CharacterId == characterId)
                    .Select(sp => sp.SpellId)
                    .Distinct()
                    .ToListAsync();

                var allSpells = await _context.Spells
                    .Where(s => spellIds.Contains(s.Id))
                    .Include(s => s.Level)
                    .Include(s => s.Cost)
                    .Include(s => s.Components)
                    .Include(s => s.Duration)
                    .Include(s => s.School)
                    .Include(s => s.SavingThrow)
                    .Include(s => s.SpellSpellDamages).ThenInclude(sd => sd.SpellDamage)
                    .AsNoTracking()
                    .ToListAsync();

                var spellDictionary = allSpells.ToDictionary(s => s.Id);


                var allTraits = await _context.RacialTraits
                    .ToListAsync();

                var backgroundTraits = await _context.BackgroundPrivilege
                    .ToListAsync();

                var classTraits = await _context.ClassFeatures
                    .ToListAsync();

                var raceTraitDictionary = allTraits.GroupBy(t => t.Id).ToDictionary(g => g.Key, g => g.First());
                var backgroundTraitDictionary = backgroundTraits.GroupBy(t => t.Id).ToDictionary(g => g.Key, g => g.First());
                var classTraitDictionary = classTraits.GroupBy(t => t.Id).ToDictionary(g => g.Key, g => g.First());

                var character = await _context.Characters
                    .Where(c => c.Id == characterId)
                    .Select(c => new
                    {
                        c.Id,
                        c.Name,
                        c.Image,
                        c.LifePoints,
                        Background = new { c.Background.Id, c.Background.Name, c.Background.Description },
                        Race = new { c.Race.Id, c.Race.Name, c.Race.Description },
                        Subrace = c.Subrace != null ? new { c.Subrace.Id, c.Subrace.Name } : null,
                        Stats = c.Stats.Select(s => new { s.Stat.Name, s.Value }).ToList(),
                        Skill = c.Skills.Select(cs => new
                        {
                            SkillName = cs.Skill.Name,
                            IsProficient = cs.IsProficient,
                            StatName = cs.Skill.Stat.Name
                        }),
                        ClassAssignments = c.ClassAssignments.Select(ca => new
                        {
                            ca.Class.Id,
                            ca.Class.Name,
                            ca.LevelInClass,
                            Subclass = ca.Subclass != null ? new { ca.Subclass.Id, ca.Subclass.Name } : null,
                            Proficiencies = ca.Class.ClassProficiencies.Select(p => new
                            {
                                Name = p.Proficiency.Type.ToString(),
                                Description = p.Proficiency.Description
                            }).ToList()
                        }).ToList(),
                        Traits = c.Traits.Select(t => new { t.Source, t.TraitId }).ToList(),
                        Inventory = c.CharacterInventories.Select(inv => new
                        {
                            inv.MaxWeight,
                            Items = inv.InventoryItemAssignments.Select(iia => new { iia.InventoryItemId, iia.IsEquiped, iia.Quantity }).ToList()
                        }).ToList(),
                        Spells = c.CharacterSpells.Select(sp => new { sp.SpellId, sp.IsPrepared }).ToList()
                    })
                    .FirstOrDefaultAsync();

                if (character == null)
                    return null;


                var traits = character.Traits.Select(t =>
                {
                    TraitsDto realTrait = null;

                    if (t.Source == TraitSource.Race || t.Source == TraitSource.Subrace)
                    {
                        var raceTrait = raceTraitDictionary.GetValueOrDefault(t.TraitId);
                        if (raceTrait != null)
                        {
                            realTrait = new TraitsDto
                            {
                                Id = raceTrait.Id,
                                Name = raceTrait.Name,
                                Description = raceTrait.Description,
                                Source = t.Source
                            };
                        }
                    }
                    else if (t.Source == TraitSource.Background)
                    {
                        var backgroundTrait = backgroundTraitDictionary.GetValueOrDefault(t.TraitId);
                        if (backgroundTrait != null)
                        {
                            realTrait = new TraitsDto
                            {
                                Id = backgroundTrait.Id,
                                Name = backgroundTrait.Name,
                                Description = backgroundTrait.Description,
                                Source = t.Source
                            };
                        }
                    }
                    else if (t.Source == TraitSource.Class || t.Source == TraitSource.Subclass)
                    {
                        var classTrait = classTraitDictionary.GetValueOrDefault(t.TraitId);
                        if (classTrait != null)
                        {
                            realTrait = new TraitsDto
                            {
                                Id = classTrait.Id,
                                Name = classTrait.Name,
                                Description = classTrait.Description,
                                Source = t.Source
                            };
                        }
                    }

                    return realTrait;
                }).Where(x => x != null).ToList();

                var totalLevel = character.ClassAssignments.Sum(cl => cl.LevelInClass);
                int proficiencyBonus = totalLevel switch
                {
                    >= 1 and <= 4 => 2,
                    >= 5 and <= 8 => 3,
                    >= 9 and <= 12 => 4,
                    >= 13 and <= 16 => 5,
                    >= 17 and <= 20 => 6,
                    _ => 0
                };

                var dto = new CharacterDto
                {
                    Id = character.Id,
                    Name = character.Name,
                    Image = character.Image,
                    LifePoints = character.LifePoints,
                    Level = totalLevel,
                    ProficiencyBonus = proficiencyBonus,
                    Background = new BackroundDto
                    {
                        Id = character.Background.Id,
                        Name = character.Background.Name,
                        Description = character.Background.Description
                    },

                    Race = new RaceDto
                    {
                        Id = character.Race.Id,
                        Name = character.Race.Name,
                        Description = character.Race.Description
                    },
                    Subrace = character.Subrace != null ? new SubraceDto
                    {
                        Id = character.Subrace.Id,
                        Name = character.Subrace.Name
                    } : null,
                    Stats = character.Stats.Select(s => new CharacterStatDto
                    {
                        Name = s.Name,
                        Value = s.Value
                    }).ToList(),
                    Skills = character.Skill.Select(s => new SkillDto
                    {
                        Name = s.SkillName,
                        IsProficient = s.IsProficient,
                        Stat = s.StatName
                    }).ToList(),
                    Class = character.ClassAssignments.Select(cl => new CharClassInfoShow
                    {
                        Name = cl.Name,
                        Level = cl.LevelInClass,
                        SubClass = cl.Subclass != null ? cl.Subclass.Name : null,
                        Proficiencies = cl.Proficiencies.Select(p => new ProficiencisDto
                        {
                            Name = p.Name,
                            Description = p.Description
                        }).ToList()
                    }).ToList(),
                    Traits = traits,
                    Inventory = character.Inventory.Select(inv => new CharacterInventoryDto
                    {
                        MaxWeight = inv.MaxWeight,
                        Items = inv.Items.Select(iia =>
                        {
                            var realItem = itemDictionary.GetValueOrDefault(iia.InventoryItemId);

                            if (realItem == null)
                            {
                                return new InventoryItemAssignmentDto
                                {
                                    ItemId = iia.InventoryItemId,
                                    IsEquiped = iia.IsEquiped,
                                    Quantity = iia.Quantity,
                                    Name = "Unknown",
                                    Description = "",
                                    Weight = 0,
                                    Value = 0,
                                    Category = "Unknown"
                                };
                            }

                            InventoryItemAssignmentDto itemDto = new InventoryItemAssignmentDto
                            {
                                ItemId = iia.InventoryItemId,
                                IsEquiped = iia.IsEquiped,
                                Quantity = iia.Quantity,
                                Name = realItem.Name,
                                Description = realItem.Description,
                                Weight = realItem.Weight,
                                Value = realItem.Value,
                                Category = realItem.ItemCategory?.Name ?? "Unknown"
                            };

                            switch (realItem.ItemCategory?.Name)
                            {
                                case "Armatura":
                                    var armor = realItem as Armor;
                                    if (armor != null)
                                    {
                                        itemDto.Requirements = armor.Requirements?.Select(r => new ItemRequirementDto
                                        {
                                            StatName = r.Stats?.Name ?? "Unknown",
                                            MinimumValue = r.MinimumValue
                                        }).ToList();
                                        itemDto.ArmorType = armor.ArmorType;
                                        itemDto.ArmorClass = armor.ArmorClass;
                                        itemDto.HasDisadvantageOnStealth = armor.HasDisadvantageOnStealth;
                                    }
                                    break;

                                case "Arma":
                                    var weapon = realItem as Weapon;
                                    if (weapon != null)
                                    {
                                        itemDto.Damages = weapon.Damages?.Select(d => new ItemDamageDto
                                        {
                                            DamageDice = d.Damage?.DamageDice ?? "Unknown",
                                            DamageType = d.Damage?.DamageType ?? "Unknown"
                                        }).ToList();
                                    }
                                    break;

                                case "Pozione":
                                    var potion = realItem as Potion;
                                    if (potion != null)
                                    {
                                        itemDto.Effects = potion.Effects?.Select(e => new ItemEffectDto
                                        {
                                            EffectType = e.EffectType,
                                            Value = e.Value,
                                            Description = e.Description
                                        }).ToList();
                                    }
                                    break;

                                case "Oggetto Magico":
                                    var magical = realItem as MagicalItem;
                                    if (magical != null)
                                    {
                                        itemDto.Effects = magical.Effects?.Select(e => new ItemEffectDto
                                        {
                                            EffectType = e.EffectType,
                                            Value = e.Value,
                                            Description = e.Description
                                        }).ToList();
                                    }
                                    break;

                                default:
                                    break;
                            }
                            return itemDto;
                        }).ToList()
                    }).ToList(),
                    Spells = character.Spells.Select(sp =>
                    {
                        var realSpell = spellDictionary.GetValueOrDefault(sp.SpellId);
                        return new CharSpellInfo
                        {
                            Id = realSpell?.Id ?? Guid.Empty,
                            Name = realSpell?.Name ?? "Unknown",
                            SpellLevel = realSpell.Level?.Level,
                            IsPrepared = sp.IsPrepared,
                            School = realSpell?.School?.Name ?? "Unknown",
                            IsConcentration = realSpell?.IsConcentration ?? false,
                            IsRitual = realSpell?.IsRitual ?? false,
                            Description = realSpell?.Description,
                            ExtraDescription = realSpell?.ExtraDescription,
                            Cost = realSpell?.Cost?.Cost,
                            SavingThrowId = realSpell?.SavingThrow?.Name,
                            Components = realSpell?.Components?.Name,
                            Duration = realSpell?.Duration?.Name,
                            Range = realSpell?.Range,
                            Damage = realSpell?.SpellSpellDamages?.Select(sd => new SpellDamageDto
                            {
                                Id = sd.SpellDamage?.Id ?? Guid.Empty,
                                DamageDice = sd.SpellDamage?.DamageDice ?? "Unknown",
                                DamageType = sd.SpellDamage?.DamageType ?? "Unknown"
                            }).ToList() ?? new List<SpellDamageDto>()
                        };
                    }).ToList()

                };

                return dto;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Errore in GetCharacterById: {ex.Message}");
                return null;
            }
        }



    }
}
