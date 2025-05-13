using System.Security.Claims;
using BaseModelWebApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OniriumBE.DTOs.Account;
using OniriumBE.DTOs.AttackSpells;
using OniriumBE.DTOs.Campaign;
using OniriumBE.DTOs.Inventory;
using OniriumBE.Models.Campaign;
using OniriumBE.Services;
using Serilog;
using static System.Net.Mime.MediaTypeNames;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace OniriumBE.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CampaignController : ControllerBase
    {
        private readonly CampaignService _campaignService;
        private readonly EmailServices _emailService;
        private readonly PlayerServices _playerServices;
        [ActivatorUtilitiesConstructor]
        public CampaignController(CampaignService campaignService, EmailServices email, PlayerServices playerServices)
        {
            _campaignService = campaignService;
            _emailService = email;
            _playerServices = playerServices;
        }

        #region Session

        [HttpPost("{campaignId}/sessions")]
        public async Task<IActionResult> CreateSession(Guid campaignId, [FromBody] SessionDto dto)
        {
            try
            {
                var created = await _campaignService.CreateSessionAsync(campaignId, dto);
                return created ? Ok(new { Message = "Sessione aggiunta!" }) : BadRequest(new { Message = "Something went wrong!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("session/{id}")]
        public async Task<IActionResult> UpdateSession(Guid id, [FromBody] SessionDto dto)
        {
            var updated = await _campaignService.UpdateSessionAsync(id, dto);
            return updated ? Ok(new { message = "Sessione aggiornata!" }) : BadRequest(new { message = "Something went wrong" });
        }

        [HttpDelete("session/{id}")]
        public async Task<IActionResult> DeleteSession(Guid id)
        {
            var success = await _campaignService.DeleteSessionAsync(id);
            return success ? Ok(new { message = "Sessione eliminata!" }) : BadRequest(new { message = "Something went wrong" });

        }

        [HttpGet("session/{id}")]
        public async Task<IActionResult> GetSession(Guid sessionId)
        {
            var session = await _campaignService.GetSessionByIdAsync(sessionId);
            if (session == null)
            {
                return BadRequest(new
                {
                    message = "Something went wrong"
                });
            }

            return Ok(new
            {
                data = session
            });
        }

        [HttpGet("{campaignId}/sessions")]
        public async Task<IActionResult> ListSessions(Guid campaignId)
        {
            var sessions = await _campaignService.ListSessionsAsync(campaignId);
            if (sessions == null)
            {
                return BadRequest(new
                {
                    message = "Qualcosa è andato storto!"
                });
            }
            return Ok(new
            {
                data = sessions
            });
        }
        #endregion

        #region Locations
        [HttpPost("{campaignId}/locations")]
        public async Task<IActionResult> CreateLocation(Guid campaignId, [FromForm] LocationDto dto)
        {
            try
            {
                var created = await _campaignService.AddLocationAsync(dto, campaignId);
                return created ? Ok(new { Message = "Location aggiunta!" }) : BadRequest(new { Message = "Something went wrong!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("location/{id}")]
        public async Task<IActionResult> UpdateLocation(Guid id, [FromForm] LocationDto dto)
        {
            var updated = await _campaignService.UpdateLocationAsync(dto, id);
            return updated ? Ok(new { message = "Location aggiornata!" }) : BadRequest(new { message = "Something went wrong" });
        }

        [HttpDelete("location/{id}")]
        public async Task<IActionResult> DeleteLocation(Guid id)
        {
            var success = await _campaignService.DeleteLocationAsync(id);
            return success ? Ok(new { message = "Location eliminata!" }) : BadRequest(new { message = "Something went wrong" });

        }

        [HttpGet("location/{id}")]
        public async Task<IActionResult> GetLocation(Guid id)
        {
            var result = await _campaignService.GetLocationByIdAsync(id);
            if (result == null)
            {
                return BadRequest(new
                {
                    message = "Something went wrong"
                });
            }

            return Ok(new
            {
                data = result
            });
        }

        [HttpGet("{campaignId}/locations")]
        public async Task<IActionResult> ListLocations(Guid campaignId)
        {
            var sessions = await _campaignService.ListLocationsAsync(campaignId);
            if (sessions == null)
            {
                return BadRequest(new
                {
                    message = "Qualcosa è andato storto!"
                });
            }
            return Ok(new
            {
                data = sessions
            });
        }
        #endregion

        #region Npcs
        [HttpPost("{campaignId}/npcs")]
        public async Task<IActionResult> CreateNpc(Guid campaignId, [FromBody] NpcDto dto)
        {
            try
            {
                var created = await _campaignService.AddNpcAsync(dto, campaignId);
                return created ? Ok(new { Message = "Npc aggiunto!" }) : BadRequest(new { Message = "Something went wrong!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("npc/{id}")]
        public async Task<IActionResult> UpdateNpc([FromBody] NpcDto dto)
        {
            var updated = await _campaignService.UpdateNpcAsync(dto);
            return updated ? Ok(new { message = "Npc aggiornato!" }) : BadRequest(new { message = "Something went wrong" });
        }

        [HttpDelete("npc/{id}")]
        public async Task<IActionResult> DeleteNpc(Guid npcId)
        {
            var success = await _campaignService.DeleteLocationAsync(npcId);
            return success ? Ok(new { message = "Npc eliminato!" }) : BadRequest(new { message = "Something went wrong" });

        }

        [HttpGet("npc/{id}")]
        public async Task<IActionResult> GetNpc(Guid npcId)
        {
            var result = await _campaignService.GetNpcByIdAsync(npcId);
            if (result == null)
            {
                return BadRequest(new
                {
                    message = "Something went wrong"
                });
            }

            return Ok(new
            {
                data = result
            });
        }

        [HttpGet("{campaignId}/npcs")]
        public async Task<IActionResult> ListNpcs(Guid campaignId)
        {
            var sessions = await _campaignService.ListNpcsAsync(campaignId);
            if (sessions == null)
            {
                return BadRequest(new
                {
                    message = "Qualcosa è andato storto!"
                });
            }
            return Ok(new
            {
                data = sessions
            });
        }
        #endregion

        #region Queest
        [HttpPost("{campaignId}/quests")]
        public async Task<IActionResult> CreateQuest(Guid campaignId, [FromBody] QuestDto dto)
        {
            try
            {
                var created = await _campaignService.AddQuestAsync(dto, campaignId);
                return created ? Ok(new { Message = "quest aggiunto!" }) : BadRequest(new { Message = "Something went wrong!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("quests/{id}")]
        public async Task<IActionResult> UpdateQuest([FromBody] QuestDto dto)
        {
            var updated = await _campaignService.UpdateQuestAsync(dto);
            return updated ? Ok(new { message = "Quest aggiornato!" }) : BadRequest(new { message = "Something went wrong" });
        }

        [HttpDelete("quests/{id}")]
        public async Task<IActionResult> DeleteQuest(Guid id)
        {
            var success = await _campaignService.DeleteQuestAsync(id);
            return success ? Ok(new { message = "Quest eliminato!" }) : BadRequest(new { message = "Something went wrong" });

        }

        [HttpGet("quests/{id}")]
        public async Task<IActionResult> GetQuest(Guid id)
        {
            var result = await _campaignService.GetQuestByIdAsync(id);
            if (result == null)
            {
                return BadRequest(new
                {
                    message = "Something went wrong"
                });
            }

            return Ok(new
            {
                data = result
            });
        }

        [HttpGet("{campaignId}/quests")]
        public async Task<IActionResult> ListQuest(Guid campaignId)
        {
            var sessions = await _campaignService.ListQuestsAsync(campaignId);
            if (sessions == null)
            {
                return BadRequest(new
                {
                    message = "Qualcosa è andato storto!"
                });
            }
            return Ok(new
            {
                data = sessions
            });
        }
        #endregion

        #region Notes
        [HttpPost("{campaignId}/notes")]
        public async Task<IActionResult> CreateNotes(Guid campaignId, [FromForm] NoteDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var email = User.FindFirst(ClaimTypes.Email)?.Value;
            try
            {
                var created = await _campaignService.AddNoteAsync(dto, campaignId, email);
                return created ? Ok(new { Message = "Nota aggiunta!" }) : BadRequest(new { Message = "Something went wrong!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("notes/{id}")]
        public async Task<IActionResult> UpdateNote([FromForm] NoteDto dto)
        {
            var updated = await _campaignService.UpdateNoteAsync(dto);
            return updated ? Ok(new { message = "Nota aggiornata!" }) : BadRequest(new { message = "Something went wrong" });
        }

        [HttpDelete("notes/{id}")]
        public async Task<IActionResult> DeleteNote(Guid id)
        {
            var success = await _campaignService.DeleteNoteAsync(id);
            return success ? Ok(new { message = "Nota eliminata!" }) : BadRequest(new { message = "Something went wrong" });

        }

        [HttpGet("notes/{id}")]
        public async Task<IActionResult> GetNote(Guid id)
        {
            var result = await _campaignService.GetNotesByIdAsync(id);
            if (result == null)
            {
                return BadRequest(new
                {
                    message = "Something went wrong"
                });
            }

            return Ok(new
            {
                data = result
            });
        }

        [HttpGet("{campaignId}/notes")]
        public async Task<IActionResult> ListNotes(Guid campaignId)
        {
            var sessions = await _campaignService.ListNotesAsync(campaignId);
            if (sessions == null)
            {
                return BadRequest(new
                {
                    message = "Qualcosa è andato storto!"
                });
            }
            return Ok(new
            {
                data = sessions
            });
        }
        #endregion

        #region Campaign
        [HttpPost]
        public async Task<IActionResult> CreateCampaign([FromForm] CampaignCreateModel dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                Console.WriteLine(userId);
                return Unauthorized("User must be logged in to create a character");
            }
            try
            {
                var created = await _campaignService.CreateCampaignAsync(dto, userId);
                return created ? Ok(new { Message = "Campagna aggiunta!" }) : BadRequest(new { Message = "Something went wrong!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetUserCampaigns()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User must be logged in to view campaigns");
            }

            try
            {
                var campaigns = await _campaignService.GetCampaignsByUserIdAsync(userId);
                return Ok(new { data = campaigns });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetCampaign(Guid id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var result = await _campaignService.GetSingleCampaignAsync(id, userId);
            if (result == null)
            {
                return BadRequest(new
                {
                    message = "Something went wrong"
                });
            }

            return Ok(new
            {
                data = result
            });
        }

        [HttpPost("character-assignment/{assignmentId}/notes")]
        public async Task<IActionResult> AddNote(Guid assignmentId, [FromBody] string note)
        {
            var success = await _campaignService.AddNoteToAssignmentAsync(assignmentId, note);
            return success ? Ok(new { message = "Nota aggiunta!" }) : BadRequest(new { message = "Errore aggiungendo nota." });
        }

        [HttpDelete("{campaignId}")]
        public async Task<IActionResult> DeleCampaign(Guid campaignId)
        {
            var success = await _campaignService.DeleteCampaign(campaignId);
            return success ? Ok(new { message = "campagna eliminata!" }) : BadRequest(new { message = "Errore eliminando la campagna." });
        }


        [HttpDelete("{assignment}/player/remove")]
        public async Task<ActionResult> DeletePlayer([FromRoute] int assignment)
        {
            var success = await _playerServices.RemovePlayerAsync(assignment);
            if (!success)
            {
                return NotFound();
            }

            return Ok(new { message = "player eliminato!" });
        }

        [HttpPut("{campaignId}")]
        public async Task<IActionResult> UpdateCampaign([FromRoute] Guid campaignId, [FromForm] UpdateCampaign model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var result = await _campaignService.Update(campaignId, model);

                if (!result)
                {
                    return StatusCode(500, "Errore durante l'aggiornamento della campagna");
                }
                return Ok(new { message = "updated" });
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Errore inaspettato nell'update.");
                return StatusCode(500, "Errore interno del server.");
            }
        }




        [HttpPut("character-assignment/{assignmentId}/notes")]
        public async Task<IActionResult> UpdateNotes(Guid assignmentId, [FromBody] List<string> notes)
        {
            var success = await _campaignService.UpdateNotesOfAssignmentAsync(assignmentId, notes);
            return success ? Ok(new { message = "Note aggiornate!" }) : BadRequest(new { message = "Errore aggiornando note." });
        }

        [HttpDelete("character-assignment/{assignmentId}/notes/{noteIndex}")]
        public async Task<IActionResult> DeleteNote(Guid assignmentId, int noteIndex)
        {
            var success = await _campaignService.DeleteNoteFromAssignmentAsync(assignmentId, noteIndex);
            return success ? Ok(new { message = "Nota eliminata!" }) : BadRequest(new { message = "Errore eliminando nota." });
        }


        #endregion

        #region Players

        [HttpGet("players")]
        public async Task<IActionResult> ListNotes(string users)
        {
            var result = await _campaignService.ListUsers(users);
            if (result == null)
            {
                return BadRequest(new
                {
                    message = "Qualcosa è andato storto!"
                });
            }
            return Ok(new
            {
                data = result
            });
        }


        [HttpPost("invite")]
        public async Task<IActionResult> Invia([FromBody] InviteRequest model)
        {

            await _emailService.SendPlayerInviteEmailAsync(model);

            return Ok(new { message = "Inviti inviati." });
        }

        [HttpPost("confirm")]
        public async Task<IActionResult> ConfermaInvito([FromQuery] Guid campaignId, [FromQuery] Guid token)
        {
            var (success, message) = await _emailService.ConfermaInvitoAsync(campaignId, token, User);

            if (!success)
                return BadRequest(new { message });

            return Ok(new { message });
        }

        [HttpGet("player/{playerCampaignId}")]
        public async Task<ActionResult> GetAssignmentsForPlayerCampaign(int playerCampaignId)
        {
            var assignments = await _campaignService.GetAssignmentsForPlayerCampaignAsync(playerCampaignId);
            return Ok(assignments);
        }

        [HttpGet("player/assign/{id}")]
        public async Task<ActionResult> GetAssignmentById(Guid id)
        {
            var assignment = await _campaignService.GetAssignmentByIdAsync(id);
            if (assignment == null)
            {
                return NotFound();
            }

            return Ok(assignment);
        }

        [HttpPost("player/assign")]
        public async Task<ActionResult> AssignCharacterToPlayerCampaign([FromBody] AssignCharacterRequest request)
        {
            try
            {
                var assignment = await _campaignService.AssignCharacterToPlayerCampaignAsync(request.CharacterId, request.PlayerCampaignId);
                return assignment ? Ok(new { Message = "ok!" }) : BadRequest(new { Message = "Something went wrong!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("player/assign/{id}")]
        public async Task<ActionResult> UpdateAssignment(Guid id, [FromBody] UpdateCharacterAssignmentRequest request)
        {
            var updatedAssignment = await _campaignService.UpdateAssignmentAsync(id, request.IsAlive, request.Notes);
            if (updatedAssignment == null)
            {
                return NotFound();
            }

            return Ok(updatedAssignment);
        }

        [HttpDelete("player/assign/{id}")]
        public async Task<ActionResult> DeleteAssignment(Guid id)
        {
            var success = await _campaignService.DeleteAssignmentAsync(id);
            if (!success)
            {
                return NotFound();
            }

            return success ? Ok(new { message = "campagna eliminata!" }) : BadRequest(new { message = "Errore eliminando la campagna." });
        }

        [HttpPost("{characterId}/inventory/add")]
        public async Task<IActionResult> AddItemToInventory([FromRoute] Guid characterId, [FromBody] List<AddItemToInventoryModel> request)
        {
            try
            {
                foreach (var item in request)
                {
                    await _playerServices.AddItemToInventoryAsync(characterId, item.ItemId, item.Quantity);
                }
                return Ok(new { message = "item added" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpPost("{characterId}/spells/add")]
        public async Task<IActionResult> AddSpellToCharacter([FromRoute] Guid characterId, [FromBody] List<AddSpellToCharacterModel> request)
        {
            try
            {
                foreach (var item in request)
                {
                    var result = await _playerServices.AddSpellToCharacterAsync(characterId, item.SpellId, item.IsPrepared);
                    if (result)
                    {
                        return Ok(new { message = "spell added" });
                    }
                }
                return BadRequest("Failed to add spell to character.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("{characterId}/update-prepared")]
        public async Task<IActionResult> UpdateItemOrSpellPrepared([FromRoute] Guid characterId, [FromBody] AddItemToInventoryModel request)
        {
            try
            {
                var result = await _playerServices.UpdateItemOrSpellPreparedAsync(characterId, request.ItemId, request.IsEquiped, request.Quantity);
                if (result)
                {
                    return Ok(new { message = "item or spell updated" });
                }
                return BadRequest("Failed to update item or spell prepared state.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpDelete("{characterId}/spells/remove")]
        public async Task<ActionResult> DeleteSpellFromChar([FromRoute] Guid characterId, [FromBody] Guid id)
        {
            var success = await _playerServices.RemoveSpellAsync(characterId, id);
            if (!success)
            {
                return NotFound();
            }

            return Ok(new { message = "incantesimo eliminato!" });
        }

        [HttpPut("update/{characterId}")]
        public async Task<IActionResult> UpdateCharacter([FromRoute] Guid characterId, [FromForm] UpdateCampaignCharacterDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var result = await _playerServices.UpdateChar(characterId, model);

                if (!result)
                {
                    return StatusCode(500, "Errore durante l'aggiornamento del personaggio.");
                }
                return Ok(new { message = "updated" });
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Errore inaspettato nell'update del personaggio con id {CharacterId}", characterId);
                return StatusCode(500, "Errore interno del server.");
            }
        }

        [HttpPut("updateLife/{characterId}")]
        public async Task<IActionResult> UpdateCharLife([FromRoute] Guid characterId, [FromBody] UpdateLifeDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var result = await _playerServices.UpdateCharLif(characterId, dto.Total, dto.Current, dto.Temporary);

                if (!result)
                {
                    return StatusCode(500, "Errore durante l'aggiornamento del personaggio.");
                }
                return Ok(new { message = "updated" });
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Errore inaspettato nell'update del personaggio con id {CharacterId}", characterId);
                return StatusCode(500, "Errore interno del server.");
            }
        }



        #endregion
    }
}

