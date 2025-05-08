using Microsoft.EntityFrameworkCore;
using OniriumBE.Data;
using OniriumBE.DTOs.Campaign;
using OniriumBE.DTOs.Character;
using OniriumBE.DTOs.Class;
using OniriumBE.Models.Campaign.CampaignChar;
using OniriumBE.Models.Char.Classes;
using Serilog;

namespace OniriumBE.Services
{
    public class PlayerServices
    {
        private ApplicationDbContext _context;
        private ShareServices _services;
        private CampaignService _campaign;

        public PlayerServices(ApplicationDbContext context, ShareServices services, CampaignService campaign)
        {
            _context = context;
            _services = services;
            _campaign = campaign;
        }

        public async Task<bool> AddItemToInventoryAsync(Guid characterId, Guid itemId, int quantity)
        {
            var character = await _context.CampaignCharacters
                .Include(c => c.Inventory)
                .FirstOrDefaultAsync(c => c.Id == characterId);

            if (character == null)
            {
                throw new Exception("Character not found.");
            }
            var existingItem = character.Inventory.FirstOrDefault(i => i.ItemId == itemId);
            if (existingItem != null)
            {
                existingItem.Quantity = quantity;
            }
            else
            {
                character.Inventory.Add(new CampaignCharItem
                {
                    ItemId = itemId,
                    Quantity = quantity
                });
            }

            await _context.SaveChangesAsync();
            return true;
        }




        public async Task<bool> AddSpellToCharacterAsync(Guid characterId, Guid spellId, bool isPrepared)
        {
            var character = await _context.CampaignCharacters
                .Include(c => c.Spells)
                .FirstOrDefaultAsync(c => c.Id == characterId);
            if (character == null)
            {
                throw new Exception("Character not found.");
            }
            var existingSpell = character.Spells.FirstOrDefault(s => s.SpellId == spellId);
            if (existingSpell != null)
            {
                throw new Exception("Spell already assigned to character.");
            }
            character.Spells.Add(new CampaignCharSpells
            {
                SpellId = spellId,
                IsPrepared = isPrepared
            });
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateItemOrSpellPreparedAsync(Guid characterId, Guid itemId, bool isPrepared, int quantity)
        {
            var character = await _context.CampaignCharacters
                .Include(c => c.Inventory)
                .Include(c => c.Spells)
                .FirstOrDefaultAsync(c => c.Id == characterId);

            if (character == null)
            {
                throw new Exception("Character not found.");
            }
            var item = character.Inventory.FirstOrDefault(i => i.Id == itemId);
            if (item != null)
            {
                if (quantity == 0)
                {
                    character.Inventory.Remove(item);
                    return await _services.SaveAsync();
                }
                else
                {
                    item.IsEquiped = isPrepared;
                    item.Quantity = quantity;
                    return await _services.SaveAsync();
                }
            }
            var spell = character.Spells.FirstOrDefault(s => s.SpellId == itemId);
            if (spell != null)
            {
                spell.IsPrepared = isPrepared;
                return await _services.SaveAsync();
            }

            throw new Exception("Item or spell not found.");
        }

        public async Task<bool> RemoveSpellAsync(Guid characterId, Guid spellId)
        {
            var character = await _context.CampaignCharacters
                .Include(c => c.Spells)
                .FirstOrDefaultAsync(c => c.Id == characterId);
            if (character == null)
            {
                throw new Exception("Character not found.");
            }
            var spell = character.Spells.FirstOrDefault(s => s.SpellId == spellId);

            if (spell == null)
            {
                throw new Exception("Spell not found.");
            }

            character.Spells.Remove(spell);

            return await _services.SaveAsync();
        }


        public async Task<bool> UpdateChar(Guid charId, UpdateCampaignCharacterDto model)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            try
            {
                var character = await _context.CampaignCharacters
           .Include(c => c.Classes)
           .Include(c => c.Stats)
           .Include(c => c.Inventory)
           .Include(c => c.Traits)
           .Include(c => c.Spells)
           .Include(c => c.Skills)
           .FirstOrDefaultAsync(c => c.Id == charId);

                if (character == null)
                {
                    throw new KeyNotFoundException("Character not found.");
                }

                string webPath = character.Image;
                if (model.Image != null)
                {
                    if (!string.IsNullOrEmpty(webPath))
                    {
                        int usageCount = await _context.Locations
                            .CountAsync(l => l.Image == webPath);

                        if (usageCount <= 1)
                        {
                            var oldImagePath = Path.Combine(Directory.GetCurrentDirectory(), webPath.TrimStart('/'));
                            if (File.Exists(oldImagePath))
                            {
                                File.Delete(oldImagePath);
                            }
                        }
                    }
                    var fileName = $"{Guid.NewGuid()}_{model.Image.FileName}";
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "assets", "images", fileName);

                    await using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await model.Image.CopyToAsync(stream);
                    }
                    webPath = "assets/quest/" + fileName;
                }

                character.Name = model.Name;
                character.Image = webPath;
                character.BackgroundName = model.BackgroundName;
                character.RaceName = model.RaceName;
                character.SubraceName = model.SubraceName;

                //Classe
                var toRemove = character.Classes
                    .Where(c => !model.Classes.Any(dto => dto.ClassName == c.ClassName))
                    .ToList();

                foreach (var c in toRemove)
                    character.Classes.Remove(c);

                foreach (var classDto in model.Classes)
                {
                    var existingClass = character.Classes.FirstOrDefault(c => c.ClassName == classDto.ClassName);
                    if (existingClass != null)
                    {
                        existingClass.LevelInClass = classDto.LevelInClass;
                        existingClass.SubClassName = classDto.SubClassName;
                    }
                    else
                    {
                        var classEntity = await _context.Classes
                            .Include(c => c.ClassProficiencies)
                                .ThenInclude(cp => cp.Proficiency)
                            .FirstOrDefaultAsync(c => c.Name == classDto.ClassName);
                        if (classEntity == null)
                        {
                            throw new KeyNotFoundException($"Class '{classDto.ClassName}' not found.");
                        }

                        character.Classes.Add(new CharacterClass
                        {
                            ClassName = classEntity.Name,
                            LevelInClass = classDto.LevelInClass,
                            SubClassName = classDto.SubClassName ?? null,
                            ClassProficiencies = classEntity.ClassProficiencies.Select(p => new Proficiency
                            {
                                Type = p.Proficiency.Type,
                                Description = p.Proficiency.Description
                            }).ToList()
                        });
                    }
                }
                character.Level = character.Classes.Sum(c => c.LevelInClass);
                character.ProficiencyBonus = character.Level switch
                {
                    >= 1 and <= 4 => 2,
                    >= 5 and <= 8 => 3,
                    >= 9 and <= 12 => 4,
                    >= 13 and <= 16 => 5,
                    >= 17 and <= 20 => 6,
                    _ => 0
                };

                //Stats
                var toRemoveStat = character.Stats
                   .Where(s => !model.Stats.Any(dto => dto.Name == s.Name))
                   .ToList();

                foreach (var stat in toRemoveStat)
                    character.Stats.Remove(stat);

                foreach (var statDto in model.Stats)
                {
                    var existing = character.Stats.FirstOrDefault(s => s.Name == statDto.Name);
                    if (existing != null)
                    {
                        existing.Value = statDto.Value;
                    }
                    else
                    {
                        character.Stats.Add(new CampaignCharacterStat
                        {
                            Name = statDto.Name,
                            Value = statDto.Value
                        });
                    }
                }

                //skill
                var toRemoveSkill = character.Skills
                    .Where(s => !model.Skills.Any(dto => dto.Name == s.Name))
                    .ToList();

                foreach (var skill in toRemoveSkill)
                    character.Skills.Remove(skill);

                foreach (var dto in model.Skills)
                {
                    var existing = character.Skills.FirstOrDefault(s => s.Name == dto.Name);
                    if (existing != null)
                    {
                        existing.IsProficient = dto.IsProficient;
                        existing.Stat = dto.Stat;
                    }
                    else
                    {
                        character.Skills.Add(new CampaignCharacterSkills
                        {
                            Name = dto.Name,
                            IsProficient = dto.IsProficient,
                            Stat = dto.Stat
                        });
                    }
                }

                //traits

                var toRemoveTrait = character.Traits
                    .Where(t => !model.Traits.Any(dto => dto.Name == t.Name && dto.Description == t.Description))
                    .ToList();

                foreach (var trait in toRemoveTrait)
                    character.Traits.Remove(trait);

                foreach (var dto in model.Traits)
                {
                    var existing = character.Traits.FirstOrDefault(t =>
                        t.Name == dto.Name && t.Description == dto.Description);

                    if (existing == null)
                    {
                        character.Traits.Add(new CampaignCharTrait
                        {
                            Name = dto.Name,
                            Description = dto.Description,
                            Source = dto.Source
                        });
                    }
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



    }
}
