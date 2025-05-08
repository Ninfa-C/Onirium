using System.Runtime.Intrinsics.X86;
using Microsoft.EntityFrameworkCore;
using OniriumBE.Data;
using OniriumBE.DTOs.ItemsDtos;
using OniriumBE.DTOs.ItemsDtos.ShowInfoModels;
using OniriumBE.Models.AttackSpells;
using OniriumBE.Models.Items;

namespace OniriumBE.Services
{
    public class ItemService
    {
        private ApplicationDbContext _context;
        private ShareServices _services;

        public ItemService(ApplicationDbContext context, ShareServices services)
        {
            _context = context;
            _services = services;
        }

        public async Task<List<object>> GetItems(string? category = null)
        {
            var result = await _context.Items
                .Include(i => i.ItemCategory)
                .Include(i => (i as Armor).Requirements)
                    .ThenInclude(ir => ir.Stats)
                .Include(i => (i as Weapon).Damages)
                    .ThenInclude(d => d.Damage)
                .Include(i => (i as Potion).Effects)
                    .ThenInclude(ip => ip.AffectedStatObject)
                .Include(i => (i as MagicalItem).Effects)
                    .ThenInclude(ip => ip.AffectedStatObject)
                .ToListAsync();

            if (!string.IsNullOrWhiteSpace(category))
            {
                category = category.Trim().ToLower();

                result = category switch
                {
                    "arma" => result.Where(i => i.ItemCategory.Name.Equals("Arma", StringComparison.OrdinalIgnoreCase)).ToList(),
                    "armatura" => result.Where(i => i.ItemCategory.Name.Equals("Armatura", StringComparison.OrdinalIgnoreCase)).ToList(),
                    "oggettimagici" => result.Where(i => i.ItemCategory.Name.Equals("Oggetto Magico", StringComparison.OrdinalIgnoreCase)).ToList(),
                    "oggettivari" => result.Where(i =>
                        !i.ItemCategory.Name.Equals("Arma", StringComparison.OrdinalIgnoreCase) &&
                        !i.ItemCategory.Name.Equals("Armatura", StringComparison.OrdinalIgnoreCase) &&
                        !i.ItemCategory.Name.Equals("Oggetto Magico", StringComparison.OrdinalIgnoreCase)
                    ).ToList(),
                    _ => result
                };
            }
            var itemDtos = new List<object>();
            if (result != null)
            {
                foreach (var item in result)
                {
                    switch (item.ItemCategory.Name)
                    {
                        case "Armatura":
                            var armor = item as Armor;
                            itemDtos.Add(new ArmorDto
                            {
                                Id = armor.Id,
                                Name = armor.Name,
                                Description = armor.Description,
                                Weight = armor.Weight,
                                Value = armor.Value,
                                ItemCategory = armor.ItemCategory.Name,
                                IsMagical = armor.IsMagical,
                                ArmorType = armor.ArmorType,
                                ArmorClass = armor.ArmorClass,
                                HasDisadvantageOnStealth = armor.HasDisadvantageOnStealth,
                                Requirements = armor.Requirements.Select(r => new ItemRequirementDto
                                {
                                    StatName = r.Stats.Name,
                                    MinimumValue = r.MinimumValue
                                }).ToList()
                            });
                            break;
                        case "Arma":
                            var weapon = item as Weapon;
                            itemDtos.Add(new WeaponDto
                            {
                                Id = weapon.Id,
                                Name = weapon.Name,
                                Description = weapon.Description,
                                Weight = weapon.Weight,
                                Value = weapon.Value,
                                ItemCategory = weapon.ItemCategory.Name,
                                IsMagical = weapon.IsMagical,
                                Damages = weapon.Damages.Select(d => new ItemDamageDto
                                {
                                    DamageDice = d.Damage.DamageDice,
                                    DamageType = d.Damage.DamageType
                                }).ToList()
                            });
                            break;
                        case "Pozione":
                            var potion = item as Potion;
                            if (potion != null)
                            {
                                itemDtos.Add(new PotionDto
                                {
                                    Id = potion.Id,
                                    Name = potion.Name,
                                    Description = potion.Description,
                                    Weight = potion.Weight,
                                    Value = potion.Value,
                                    ItemCategory = potion.ItemCategory.Name,
                                    IsMagical = potion.IsMagical,
                                    Effects = potion.Effects?.Select(e => new ItemEffectDto
                                    {
                                        EffectType = e.EffectType,
                                        Value = e.Value,
                                        Description = e.Description
                                    }).ToList()
                                });
                            }
                            break;

                        case "Oggetto Magico":
                            var magical = item as MagicalItem;
                            if (magical != null)
                            {
                                itemDtos.Add(new MagicalItemDto
                                {
                                    Id = magical.Id,
                                    Name = magical.Name,
                                    Description = magical.Description,
                                    Weight = magical.Weight,
                                    Value = magical.Value,
                                    ItemCategory = magical.ItemCategory.Name,
                                    IsMagical = magical.IsMagical,
                                    Rarity = magical.Rarity,
                                    RequiresAttunement = magical.RequiresAttunement,
                                    Effects = magical.Effects?.Select(e => new ItemEffectDto
                                    {
                                        EffectType = e.EffectType,
                                        Value = e.Value,
                                        Description = e.Description
                                    }).ToList()
                                });
                            }
                            break;
                        default:
                            itemDtos.Add(new ItemBaseDto
                            {
                                Id = item.Id,
                                Name = item.Name,
                                Description = item.Description,
                                Weight = item.Weight,
                                Value = item.Value,
                                ItemCategory = item.ItemCategory.Name,
                                IsMagical = item.IsMagical,
                            });
                            break;
                    }
                }
                return itemDtos;
            }
            else
            {
                return null;
            }
        }


        public async Task<object?> GeSingleItem(Guid id)
        {
            var item = await _context.Items
                .Include(i => i.ItemCategory)
                .Include(i => (i as Armor).Requirements)
                .ThenInclude(ir => ir.Stats)
                .Include(i => (i as Weapon).Damages)
                    .ThenInclude(d => d.Damage)
                .Include(i => (i as Potion).Effects)
                    .ThenInclude(ip => ip.AffectedStatObject)
                .Include(i => (i as MagicalItem).Effects)
                    .ThenInclude(ip => ip.AffectedStatObject)
                .FirstOrDefaultAsync(i => i.Id == id);

            if (item == null)
                return null;


            return item.ItemCategory.Name switch
            {
                "Armatura" => new ArmorDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description,
                    Weight = item.Weight,
                    Value = item.Value,
                    ItemCategory = item.ItemCategory.Name,
                    IsMagical = item.IsMagical,
                    ArmorType = (item as Armor)!.ArmorType,
                    ArmorClass = (item as Armor)!.ArmorClass,
                    HasDisadvantageOnStealth = (item as Armor)!.HasDisadvantageOnStealth,
                    Requirements = (item as Armor)!.Requirements.Select(r => new ItemRequirementDto
                    {
                        StatName = r.Stats.Name,
                        MinimumValue = r.MinimumValue
                    }).ToList()
                },

                "Arma" => new WeaponDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description,
                    Weight = item.Weight,
                    Value = item.Value,
                    ItemCategory = item.ItemCategory.Name,
                    IsMagical = item.IsMagical,
                    Damages = (item as Weapon)!.Damages.Select(d => new ItemDamageDto
                    {
                        DamageDice = d.Damage.DamageDice,
                        DamageType = d.Damage.DamageType
                    }).ToList()
                },

                "Pozione" => new PotionDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description,
                    Weight = item.Weight,
                    Value = item.Value,
                    ItemCategory = item.ItemCategory.Name,
                    IsMagical = item.IsMagical,
                    Effects = (item as Potion)!.Effects?.Select(e => new ItemEffectDto
                    {
                        EffectType = e.EffectType,
                        Value = e.Value,
                        Description = e.Description
                    }).ToList()
                },

                "Oggetto Magico" => new MagicalItemDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description,
                    Weight = item.Weight,
                    Value = item.Value,
                    ItemCategory = item.ItemCategory.Name,
                    IsMagical = item.IsMagical,
                    Rarity = (item as MagicalItem)!.Rarity,
                    RequiresAttunement = (item as MagicalItem)!.RequiresAttunement,
                    Effects = (item as MagicalItem)!.Effects?.Select(e => new ItemEffectDto
                    {
                        EffectType = e.EffectType,
                        Value = e.Value,
                        Description = e.Description
                    }).ToList()
                },

                _ => new ItemBaseDto
                {
                    Id = item.Id,
                    Name = item.Name,
                    Description = item.Description,
                    Weight = item.Weight,
                    Value = item.Value,
                    ItemCategory = item.ItemCategory.Name,
                    IsMagical = item.IsMagical,
                },
            };
        }

        public async Task<Items?> CreateItemAsync(ItemCreateModel dto)
        {
            var category = await _context.ItemCategories.FirstOrDefaultAsync(c => c.Id == dto.ItemCategoryId);
            if (category == null)
                return null;

            Items item;

            switch (category.Name)
            {
                case "Arma":
                    var weapon = new Weapon
                    {
                        Id = Guid.NewGuid(),
                        Name = dto.Name,
                        Description = dto.Description,
                        Weight = dto.Weight,
                        Value = dto.Value,
                        IsMagical = dto.IsMagical,
                        CreatedAt = DateTime.UtcNow,
                        ItemCategoryId = category.Id,
                        Damages = dto.Damages?.Select(d => new ItemDamage
                        {
                            Id = Guid.NewGuid(),
                            Damage = new Damage
                            {
                                Id = Guid.NewGuid(),
                                DamageDice = d.DamageDice,
                                DamageType = d.DamageType
                            }
                        }).ToList() ?? new()
                    };
                    item = weapon;
                    break;

                case "Armatura":
                    var armor = new Armor
                    {
                        Id = Guid.NewGuid(),
                        Name = dto.Name,
                        Description = dto.Description,
                        Weight = dto.Weight,
                        Value = dto.Value,
                        IsMagical = dto.IsMagical,
                        CreatedAt = DateTime.UtcNow,
                        ItemCategoryId = category.Id,
                        ArmorClass = dto.ArmorClass ?? 0,
                        ArmorType = dto.ArmorType,
                        HasDisadvantageOnStealth = dto.HasDisadvantage ?? false,
                        Requirements = dto.Requirements?.Select(r => new ItemRequirement
                        {
                            Id = Guid.NewGuid(),
                            MinimumValue = r.MinimumValue,
                            StatId = _context.Stats.First(s => s.Name == r.StatName).Id
                        }).ToList() ?? new()
                    };
                    item = armor;
                    break;

                case "Pozione":
                    var potion = new Potion
                    {
                        Id = Guid.NewGuid(),
                        Name = dto.Name,
                        Description = dto.Description,
                        Weight = dto.Weight,
                        Value = dto.Value,
                        IsMagical = dto.IsMagical,
                        CreatedAt = DateTime.UtcNow,
                        ItemCategoryId = category.Id,
                        Effects = dto.Effects.Select(e => new ItemEffect
                        {
                            Id = Guid.NewGuid(),
                            Description = e.Description,
                            EffectType = e.EffectType,
                            Value = e.Value,
                            AffectedStat = e.AffectedStat,
                            IsCustom = false
                        }).ToList()
                    };
                    item = potion;
                    break;

                case "Oggetto Magico":
                    var magicItem = new MagicalItem
                    {
                        Id = Guid.NewGuid(),
                        Name = dto.Name,
                        Description = dto.Description,
                        Weight = dto.Weight,
                        Value = dto.Value,
                        IsMagical = true,
                        CreatedAt = DateTime.UtcNow,
                        ItemCategoryId = category.Id,
                        Rarity = "Comune",
                        RequiresAttunement = false,
                        Effects = dto.Effects.Select(e => new ItemEffect
                        {
                            Id = Guid.NewGuid(),
                            Description = e.Description,
                            EffectType = e.EffectType,
                            Value = e.Value,
                            AffectedStat = e.AffectedStat,
                            IsCustom = false
                        }).ToList()
                    };
                    item = magicItem;
                    break;

                default:
                    item = new Items
                    {
                        Id = Guid.NewGuid(),
                        Name = dto.Name,
                        Description = dto.Description,
                        Weight = dto.Weight,
                        Value = dto.Value,
                        IsMagical = dto.IsMagical,
                        CreatedAt = DateTime.UtcNow,
                        ItemCategoryId = category.Id
                    };
                    break;
            }

            await _context.Items.AddAsync(item);
            await _context.SaveChangesAsync();

            return item;
        }


    }
}

