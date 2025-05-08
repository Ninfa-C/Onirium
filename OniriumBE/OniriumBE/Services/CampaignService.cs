using System.Security.Claims;
using CustomersManager.Models.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using OniriumBE.Data;
using OniriumBE.DTOs.Account;
using OniriumBE.DTOs.Campaign;
using OniriumBE.DTOs.Character;
using OniriumBE.DTOs.Class;
using OniriumBE.Models.Campaign;
using OniriumBE.Models.Campaign.CampaignChar;
using OniriumBE.Models.Char;
using OniriumBE.Models.Char.Classes;
using Serilog;

namespace OniriumBE.Services
{
    public class CampaignService
    {
        private ApplicationDbContext _context;
        private ShareServices _services;
        private readonly CharacterServices _characterService;

        public CampaignService(ApplicationDbContext context, ShareServices services, CharacterServices characterService)
        {
            _context = context;
            _services = services;
            _characterService = characterService;
        }
        #region Campaign
        public async Task<bool> CreateCampaignAsync(CampaignCreateModel model, string userId)
        {
            try
            {
                string webPath = null;
                if (model.Image != null)
                {
                    var fileName = $"{Guid.NewGuid()}_{model.Image.FileName}";

                    var path = Path.Combine(Directory.GetCurrentDirectory(), "assets", "campaign", fileName);
                    await using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await model.Image.CopyToAsync(stream);
                    }
                    webPath = Path.Combine("assets", "campaign", fileName);
                }
                var newCampaign = new Campaign
                {
                    Id = Guid.NewGuid(),
                    Name = model.Name,
                    Description = model.Description,
                    GameMasterId = userId,
                    CreateAt = DateTime.UtcNow,
                    IsDeleted = false,
                    Img = webPath
                };

                _context.Campaigns.Add(newCampaign);
                await _services.SaveAsync();

                var masterPlayer = new Players
                {
                    UserId = userId,
                    CampaignId = newCampaign.Id,
                    Role = "master"
                };

                _context.PlayerCampaign.Add(masterPlayer);
                return await _services.SaveAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Errore durante la creazione della campagna");
                return false;
            }
        }
        public async Task<List<CampaignListDto>> GetCampaignsByUserIdAsync(string userId)
        {
            var userCampaigns = await _context.PlayerCampaign
                .Where(pc => pc.UserId == userId && pc.Campaign.IsDeleted == false)
                .Select(pc => new
                {
                    Campaign = pc.Campaign,
                    pc.Role
                })
                .ToListAsync();

            var masterIds = userCampaigns
                .Select(x => x.Campaign.GameMasterId)
                .Distinct()
                .ToList();

            var masterNames = await _context.Users
                .Where(u => masterIds.Contains(u.Id))
                .ToDictionaryAsync(u => u.Id, u => u.UserName);

            var result = userCampaigns.Select(x => new CampaignListDto
            {
                Id = x.Campaign.Id,
                Name = x.Campaign.Name,
                Description = x.Campaign.Description,
                Img = x.Campaign.Img,
                Role = x.Role,
                GameMasterName = masterNames.ContainsKey(x.Campaign.GameMasterId) ? masterNames[x.Campaign.GameMasterId] : "Unknown"
            }).ToList();

            return result;
        }
        public async Task<CampaignDto> GetSingleCampaignAsync(Guid campaignId, string userId)
        {
            var campaign = await _context.Campaigns
                .Include(c => c.Players)
                    .ThenInclude(pc => pc.User)
                .Include(c => c.Players)
                    .ThenInclude(pc => pc.CharacterAssignments)
                        .ThenInclude(ca => ca.Character)
                            .ThenInclude(ch => ch.Classes)
                .Include(c => c.Players)
                    .ThenInclude(pc => pc.CharacterAssignments)
                        .ThenInclude(ca => ca.Character)
                .FirstOrDefaultAsync(c => c.Id == campaignId && !c.IsDeleted);

            if (campaign == null)
                return null;

            var master = await _context.Users.FirstOrDefaultAsync(u => u.Id == campaign.GameMasterId);

            var players = campaign.Players.Select(pc => new PlayerCampaignDto
            {
                AssignmenteId = pc.Id,
                Username = pc.User.UserName,
                Role = pc.Role,
                Characters = pc.CharacterAssignments?.Select(assign => new CharacterSummaryDto
                {
                    AssigngId = assign.Id,
                    CharId = assign.Character.Id,
                    Name = assign.Character.Name,
                    Image = assign.Character.Image,
                    RaceName = assign.Character.RaceName,
                    Classes = assign.Character.Classes.Select(cl => new CharClassInfoShow
                    {
                        Name = cl.ClassName,
                        Level = cl.LevelInClass,
                        SubClass = cl.SubClassName != null ? cl.SubClassName : null
                    }).ToList(),
                    Level = assign.Character.Classes.Sum(cl => cl.LevelInClass),
                    IsAlive = assign.IsAlive,
                    Notes = assign.Notes ?? new List<string>()
                }).ToList() ?? new List<CharacterSummaryDto>()
            }).ToList();

            var userRole = campaign.Players.FirstOrDefault(p => p.UserId == userId)?.Role ?? "unknown";

            return new CampaignDto
            {
                Id = campaign.Id,
                Name = campaign.Name,
                Description = campaign.Description,
                Image = campaign.Img,
                Role = userRole,
                GameMasterName = master?.UserName ?? "Unknown",
                Players = players
            };
        }

        public async Task<bool> DeleteCampaign(Guid campaignId)
        {
            var campaign = await _context.Campaigns
                .FirstOrDefaultAsync(c => c.Id == campaignId && !c.IsDeleted);

            if (campaign == null)
                return false;

            campaign.IsDeleted = true;
            _context.Campaigns.Update(campaign);
            return await _services.SaveAsync();
        }

        public async Task<bool> Update(Guid campaignId, UpdateCampaign dto)
        {
            var campaign = await _context.Campaigns
                .FirstOrDefaultAsync(c => c.Id == campaignId && !c.IsDeleted);

            if (campaign == null)
                return false;

            string webPath = campaign.Img;
            if (dto.Image != null)
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
                var fileName = $"{Guid.NewGuid()}_{dto.Image.FileName}";
                var path = Path.Combine(Directory.GetCurrentDirectory(), "assets", "campaign", fileName);

                await using (var stream = new FileStream(path, FileMode.Create))
                {
                    await dto.Image.CopyToAsync(stream);
                }
                webPath = "assets/campaign/" + fileName;
            }


            campaign.Img = webPath;
            campaign.Name = dto.Name;
            campaign.Description = dto.Description;

            return await _services.SaveAsync();
        }

        public async Task<bool> AddNoteToAssignmentAsync(Guid assignmentId, string note)
        {
            var assignment = await _context.CharacterPlayerAssignments.FindAsync(assignmentId);
            if (assignment == null) return false;

            assignment.Notes ??= new List<string>();
            assignment.Notes.Add(note);

            return await _services.SaveAsync();
        }

        public async Task<bool> UpdateNotesOfAssignmentAsync(Guid assignmentId, List<string> notes)
        {
            var assignment = await _context.CharacterPlayerAssignments.FindAsync(assignmentId);
            if (assignment == null) return false;

            assignment.Notes = notes;

            return await _services.SaveAsync();
        }

        public async Task<bool> DeleteNoteFromAssignmentAsync(Guid assignmentId, int noteIndex)
        {
            var assignment = await _context.CharacterPlayerAssignments.FindAsync(assignmentId);
            if (assignment == null) return false;

            if (assignment.Notes == null || noteIndex < 0 || noteIndex >= assignment.Notes.Count)
                return false;

            assignment.Notes.RemoveAt(noteIndex);

            return await _services.SaveAsync();
        }


        #endregion

        #region SessionsCRUD
        public async Task<bool> CreateSessionAsync(Guid campaignId, SessionDto dto)
        {
            try
            {
                var session = new Session
                {
                    Id = Guid.NewGuid(),
                    CampaignId = campaignId,
                    Title = dto.Title,
                    Date = dto.Date,
                    Completed = dto.Completed,
                    Summary = dto.Summary,
                    NextSessionDate = dto.NextSessionDate,
                    IsVisible = false,
                    MasterNotes = dto.MasterNotes ?? null,
                };

                _context.Sessions.Add(session);
                return await _services.SaveAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Errore durante la creazione della campagna");
                return false;
            }
        }

        public async Task<bool> UpdateSessionAsync(Guid id, SessionDto dto)
        {
            var session = await _context.Sessions.FindAsync(id);

            if (session == null)
                return false;

            session.Title = dto.Title;
            session.Date = dto.Date;
            session.Completed = dto.Completed;
            session.Summary = dto.Summary;
            session.NextSessionDate = dto.NextSessionDate;
            session.IsVisible = dto.IsVisible;
            session.MasterNotes = dto.MasterNotes;

            return await _services.SaveAsync();
        }

        public async Task<bool> DeleteSessionAsync(Guid sessionId)
        {
            var session = await _context.Sessions.FindAsync(sessionId);

            if (session == null)
                return false;

            _context.Sessions.Remove(session);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<SessionDto> GetSessionByIdAsync(Guid sessionId)
        {
            var session = await _context.Sessions.FindAsync(sessionId);

            if (session == null)
                return null;

            return new SessionDto
            {
                Id = session.Id,
                Title = session.Title,
                Date = session.Date,
                Completed = session.Completed,
                Summary = session.Summary,
                NextSessionDate = session.NextSessionDate,
                IsVisible = session.IsVisible,
                MasterNotes = session.MasterNotes,
            };
        }

        public async Task<List<SessionDto>> ListSessionsAsync(Guid campaignId)
        {
            return await _context.Sessions
                .Where(s => s.CampaignId == campaignId)
                .Select(s => new SessionDto
                {
                    Id = s.Id,
                    Title = s.Title,
                    Date = s.Date,
                    Completed = s.Completed,
                    Summary = s.Summary,
                    NextSessionDate = s.NextSessionDate,
                    IsVisible = s.IsVisible,
                    MasterNotes = s.MasterNotes,
                })
                .ToListAsync();
        }
        #endregion

        #region LocationsCRUD
        public async Task<bool> AddLocationAsync(LocationDto dto, Guid campaignId)
        {
            try
            {
                string webPath = null;
                if (dto.Image != null)
                {
                    var fileName = dto.Image.FileName;
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "assets", "locations", fileName);
                    await using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await dto.Image.CopyToAsync(stream);
                    }
                    webPath = Path.Combine("assets", "locations", fileName);
                }
                var location = new Models.Campaign.Location
                {
                    Id = Guid.NewGuid(),
                    CampaignId = campaignId,
                    Name = dto.Name,
                    Type = dto.Type,
                    Description = dto.Description,
                    Visited = dto.Visited,
                    Image = webPath,
                    IsVisible = false,
                    MasterNotes = dto.MasterNotes,
                };

                _context.Locations.Add(location);
                return await _services.SaveAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Errore durante la creazione");
                return false;
            }
        }

        public async Task<List<LocationDto>> ListLocationsAsync(Guid campaignId)
        {
            return await _context.Locations
                .Where(l => l.CampaignId == campaignId)
                .Select(l => new LocationDto
                {
                    Id = l.Id,
                    Name = l.Name,
                    Type = l.Type,
                    Description = l.Description,
                    Visited = l.Visited,
                    ImageString = l.Image,
                    IsVisible = l.IsVisible,
                    MasterNotes = l.MasterNotes,
                })
                .ToListAsync();
        }
        public async Task<LocationDto> GetLocationByIdAsync(Guid sessionId)
        {
            var result = await _context.Locations.FindAsync(sessionId);

            if (result == null)
                return null;

            return new LocationDto
            {
                Id = result.Id,
                Name = result.Name,
                Type = result.Type,
                Description = result.Description,
                Visited = result.Visited,
                ImageString = result.Image,
                IsVisible = result.IsVisible,
                MasterNotes = result.MasterNotes,
            };
        }

        public async Task<bool> UpdateLocationAsync(LocationDto dto, Guid locationsId)
        {
            try
            {
                var location = await _context.Locations.FindAsync(locationsId);
                if (location == null) return false;
                string webPath = location.Image;
                if (dto.Image != null)
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
                    var fileName = $"{Guid.NewGuid()}_{dto.Image.FileName}";
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "assets", "locations", fileName);

                    await using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await dto.Image.CopyToAsync(stream);
                    }
                    webPath = "assets/locations/" + fileName;
                }

                location.Name = dto.Name;
                location.Type = dto.Type;
                location.Description = dto.Description;
                location.Visited = dto.Visited;
                location.Image = webPath;
                location.IsVisible = dto.IsVisible;
                location.MasterNotes = dto.MasterNotes;

                return await _services.SaveAsync();
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> DeleteLocationAsync(Guid locationId)
        {
            var location = await _context.Locations.FindAsync(locationId);
            if (location == null) return false;

            _context.Locations.Remove(location);
            return await _services.SaveAsync();
        }
        #endregion

        #region NpcsCRUD
        public async Task<bool> AddNpcAsync(NpcDto dto, Guid campaign)
        {
            var npc = new Npc
            {
                Id = Guid.NewGuid(),
                CampaignId = campaign,
                Role = dto.Role,
                Description = dto.Description,
                Meet = false,
                IsVisible = false,
                MasterNotes = dto.MasterNotes,
            };

            _context.Npcs.Add(npc);
            return await _services.SaveAsync();
        }

        public async Task<List<NpcDto>> ListNpcsAsync(Guid campaignId)
        {
            return await _context.Npcs
                .Where(n => n.CampaignId == campaignId)
                .Select(n => new NpcDto
                {
                    Id = n.Id,
                    Role = n.Role,
                    Description = n.Description,
                    Meet = n.Meet,
                    IsVisible = n.IsVisible,
                    MasterNotes = n.MasterNotes,
                })
                .ToListAsync();
        }
        public async Task<NpcDto> GetNpcByIdAsync(Guid sessionId)
        {
            var result = await _context.Npcs.FindAsync(sessionId);

            if (result == null)
                return null;

            return new NpcDto
            {
                Id = result.Id,
                Role = result.Role,
                Description = result.Description,
                Meet = result.Meet,
                IsVisible = result.IsVisible,
                MasterNotes = result.MasterNotes,
            };
        }

        public async Task<bool> UpdateNpcAsync(NpcDto dto)
        {
            var npc = await _context.Npcs.FindAsync(dto.Id);
            if (npc == null) return false;

            npc.Role = dto.Role;
            npc.Description = dto.Description;
            npc.Meet = dto.Meet;
            npc.IsVisible = dto.IsVisible;
            npc.MasterNotes = dto.MasterNotes;

            return await _services.SaveAsync();
        }

        public async Task<bool> DeleteNpcAsync(Guid npcId)
        {
            var npc = await _context.Npcs.FindAsync(npcId);
            if (npc == null) return false;

            _context.Npcs.Remove(npc);
            return await _services.SaveAsync();
        }

        #endregion

        #region QueestCRUD
        public async Task<bool> AddQuestAsync(QuestDto dto, Guid campaignId)
        {
            try
            {
                var result = new Quest
                {
                    Id = Guid.NewGuid(),
                    CampaignId = campaignId,
                    Title = dto.Title,
                    Description = dto.Description,
                    Status = dto.Status,
                    Reward = dto.Reward,
                    IsVisible = dto.IsVisible,
                    MasterNotes = dto.MasterNotes,
                };

                _context.Quests.Add(result);
                return await _services.SaveAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Errore durante la creazione");
                return false;
            }
        }
        public async Task<List<QuestDto>> ListQuestsAsync(Guid campaignId)
        {
            return await _context.Quests
                .Where(n => n.CampaignId == campaignId)
                .Select(q => new QuestDto
                {
                    Id = q.Id,
                    Title = q.Title,
                    Description = q.Description,
                    Status = q.Status,
                    Reward = q.Reward,
                    IsVisible = q.IsVisible,
                    MasterNotes = q.MasterNotes,
                })
                .ToListAsync();
        }
        public async Task<QuestDto> GetQuestByIdAsync(Guid id)
        {
            var result = await _context.Quests.FindAsync(id);

            if (result == null)
                return null;

            return new QuestDto
            {
                Id = result.Id,
                Title = result.Title,
                Description = result.Description,
                Status = result.Status,
                Reward = result.Reward,
                IsVisible = result.IsVisible,
                MasterNotes = result.MasterNotes,
            };
        }
        public async Task<bool> UpdateQuestAsync(QuestDto dto)
        {
            var result = await _context.Quests.FindAsync(dto.Id);
            if (result == null) return false;

            result.Title = dto.Title;
            result.Description = dto.Description;
            result.Status = dto.Status;
            result.Reward = dto.Reward;
            result.IsVisible = dto.IsVisible;
            result.MasterNotes = dto.MasterNotes;

            return await _services.SaveAsync();
        }
        public async Task<bool> DeleteQuestAsync(Guid id)
        {
            var result = await _context.Quests.FindAsync(id);
            if (result == null) return false;

            _context.Quests.Remove(result);
            return await _services.SaveAsync();
        }
        #endregion

        #region NotesCRUD
        public async Task<bool> AddNoteAsync(NoteDto dto, Guid campaignId, string userId)
        {
            try
            {
                string webPath = null;
                if (dto.Image != null)
                {
                    var fileName = $"{Guid.NewGuid()}_{dto.Image.FileName}";
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "assets", "quest", fileName);
                    await using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await dto.Image.CopyToAsync(stream);
                    }
                    webPath = Path.Combine("assets", "quest", fileName);
                }
                var note = new CampaignNote
                {
                    Id = Guid.NewGuid(),
                    CampaignId = campaignId,
                    Title = dto.Title,
                    Content = dto.Content,
                    Date = dto.Date,
                    IsVisible = dto.IsVisible,
                    Image = webPath,
                    MasterOnly = dto.MasterOnly,
                    Createdby = userId,
                };

                _context.CampaignNotes.Add(note);
                return await _services.SaveAsync();
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Errore durante la creazione");
                return false;
            }
        }
        public async Task<List<NoteDto>> ListNotesAsync(Guid campaignId)
        {
            return await _context.CampaignNotes
                .Where(n => n.CampaignId == campaignId)
                .Select(n => new NoteDto
                {
                    Id = n.Id,
                    Title = n.Title,
                    Content = n.Content,
                    Date = n.Date,
                    IsVisible = n.IsVisible,
                    ImageString = n.Image,
                    MasterOnly = n.MasterOnly,
                    Createdby = n.Createdby,

                })
                .ToListAsync();
        }
        public async Task<NoteDto> GetNotesByIdAsync(Guid id)
        {
            var result = await _context.CampaignNotes.FindAsync(id);

            if (result == null)
                return null;

            return new NoteDto
            {
                Id = result.Id,
                Title = result.Title,
                Content = result.Content,
                Date = result.Date,
                IsVisible = result.IsVisible,
                ImageString = result.Image,
                MasterOnly = result.MasterOnly,
                Createdby = result.Createdby,
            };
        }
        public async Task<bool> UpdateNoteAsync(NoteDto dto)
        {
            var note = await _context.CampaignNotes.FindAsync(dto.Id);
            if (note == null) return false;

            string webPath = note.Image;
            if (dto.Image != null)
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
                var fileName = $"{Guid.NewGuid()}_{dto.Image.FileName}";
                var path = Path.Combine(Directory.GetCurrentDirectory(), "assets", "quest", fileName);

                await using (var stream = new FileStream(path, FileMode.Create))
                {
                    await dto.Image.CopyToAsync(stream);
                }
                webPath = "assets/quest/" + fileName;
            }

            note.Image = webPath;
            note.Title = dto.Title;
            note.Content = dto.Content;
            note.Date = dto.Date;
            note.IsVisible = dto.IsVisible;
            note.MasterOnly = dto.MasterOnly;

            return await _services.SaveAsync();
        }
        public async Task<bool> DeleteNoteAsync(Guid noteId)
        {
            var note = await _context.CampaignNotes.FindAsync(noteId);
            if (note == null) return false;

            _context.CampaignNotes.Remove(note);
            return await _services.SaveAsync();
        }
        #endregion

        #region Players

        public async Task<List<UserDto>> ListUsers(string username)
        {
            return await _context.ApplicationUsers
                .Where(n => n.UserName == username && !n.IsDeleted)
                .Select(n => new UserDto
                {
                    Id = n.Id,
                    Email = n.Email,
                    Username = n.UserName,
                    ProfilePictureUrl = n.ProfilePictureUrl
                })
                .ToListAsync();
        }

        public async Task<List<CharacterSummaryDto>> GetAssignmentsForPlayerCampaignAsync(int playerCampaignId)
        {

            return await _context.CharacterPlayerAssignments
                .Where(cpa => cpa.PlayerCampaignId == playerCampaignId)
                .Include(p => p.Character)
                 .ThenInclude(ch => ch.Classes)
                   .Include(p => p.Character)
                .Select(cpa => new CharacterSummaryDto
                {
                    AssigngId = cpa.Id,
                    CharId = cpa.Character.Id,
                    Name = cpa.Character.Name,
                    Image = cpa.Character.Image,
                    RaceName = cpa.Character.RaceName,
                    Classes = cpa.Character.Classes.Select(cl => new CharClassInfoShow
                    {
                        Name = cl.ClassName,
                        Level = cl.LevelInClass,
                        SubClass = cl.SubClassName != null ? cl.SubClassName : null
                    }).ToList(),
                    Level = cpa.Character.Classes.Sum(cl => cl.LevelInClass),
                    IsAlive = cpa.IsAlive,
                    Notes = cpa.Notes ?? new List<string>()
                })
                .ToListAsync() ?? new List<CharacterSummaryDto>();
        }

        public async Task<CharacterPlayerAssignment> GetAssignmentByIdAsync(Guid id)
        {
            return await _context.CharacterPlayerAssignments
                .Include(cpa => cpa.Character)
                .ThenInclude(cc => cc.Classes)
                .ThenInclude(ccc => ccc.ClassProficiencies)
                .Include(cpa => cpa.Character)
                .ThenInclude(cc => cc.Inventory)
                .Include(cpa => cpa.Character)
                .ThenInclude(cc => cc.Skills)
                .Include(cpa => cpa.Character)
                .ThenInclude(cc => cc.Spells)
                .Include(cpa => cpa.Character)
                .ThenInclude(cc => cc.Stats)
                .Include(cpa => cpa.Character)
                .ThenInclude(cc => cc.Traits)
                .AsNoTracking()
                .FirstOrDefaultAsync(cpa => cpa.Id == id);
        }

        public async Task<bool> AssignCharacterToPlayerCampaignAsync(Guid characterId, int playerCampaignId)
        {
            var originalCharacter = await _characterService.GetCharacterById(characterId);
            if (originalCharacter == null)
            {
                throw new Exception("Character not found.");
            }

            var copiedCharacter = new CampaignCharacter
            {
                Id = Guid.NewGuid(),
                Name = originalCharacter.Name,
                Image = originalCharacter.Image,
                BackgroundName = originalCharacter.Background.Name,
                RaceName = originalCharacter.Race.Name,
                SubraceName = originalCharacter.Subrace?.Name,
                Level = originalCharacter.Level,
                ProficiencyBonus = originalCharacter.ProficiencyBonus,
                TotalLifePoints = originalCharacter.LifePoints,
                CurrentLifePoints = originalCharacter.LifePoints,
                Classes = originalCharacter.Class.Select(c => new CharacterClass
                {
                    ClassName = c.Name,
                    LevelInClass = c.Level,
                    SubClassName = c.SubClass ?? null,
                    ClassProficiencies = c.Proficiencies.Select(p => new Proficiency
                    {
                        Type = (ProficiencyType)Enum.Parse(typeof(ProficiencyType), p.Name),
                        Description = p.Description
                    }).ToList()
                }).ToList(),
                Stats = originalCharacter.Stats.Select(s => new CampaignCharacterStat
                {
                    Name = s.Name,
                    Value = s.Value
                }).ToList(),
                Inventory = originalCharacter.Inventory[0].Items.Select(i => new CampaignCharItem
                {
                    ItemId = i.ItemId,
                    Quantity = i.Quantity
                }).ToList(),
                Spells = originalCharacter.Spells.Select(spell => new CampaignCharSpells
                {
                    SpellId = spell.Id,
                    IsPrepared = spell.IsPrepared
                }).ToList(),
                Skills = originalCharacter.Skills.Select(skill => new CampaignCharacterSkills
                {
                    Name = skill.Name,
                    IsProficient = skill.IsProficient,
                    Stat = skill.Stat,

                }).ToList(),
                Traits = originalCharacter.Traits
                .GroupBy(t => t.Id)
                .Select(group => group.First())
                .Select(t => new CampaignCharTrait
                {
                    Name = t.Name,
                    Description = t.Description,
                    Source = t.SourceNameIt,
                }).ToList()
            };

            _context.CampaignCharacters.Add(copiedCharacter);
            await _services.SaveAsync();

            var characterPlayerAssignment = new CharacterPlayerAssignment
            {
                Id = Guid.NewGuid(),
                CharacterId = copiedCharacter.Id,
                PlayerCampaignId = playerCampaignId,
                IsAlive = true
            };

            _context.CharacterPlayerAssignments.Add(characterPlayerAssignment);
            return await _services.SaveAsync();


        }

        public async Task<CharacterPlayerAssignment> UpdateAssignmentAsync(Guid id, bool isAlive, List<string> notes)
        {
            var assignment = await _context.CharacterPlayerAssignments.FindAsync(id);
            if (assignment == null) return null;

            assignment.IsAlive = isAlive;
            assignment.Notes = notes;

            _context.CharacterPlayerAssignments.Update(assignment);
            await _context.SaveChangesAsync();

            return assignment;
        }

        public async Task<bool> DeleteAssignmentAsync(Guid id)
        {
            var assignment = await _context.CharacterPlayerAssignments.FindAsync(id);
            if (assignment == null) return false;

            _context.CharacterPlayerAssignments.Remove(assignment);
            await _context.SaveChangesAsync();

            return true;
        }





        #endregion






    }
}
