using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using OniriumBE.DTOs.Character;
using OniriumBE.Services;
using Serilog;

namespace OniriumBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CharacterController : ControllerBase
    {
        private readonly CharacterServices _charServices;

        public CharacterController(CharacterServices charServices)
        {
            _charServices = charServices;
        }

        [HttpGet("character")]
        public async Task<IActionResult> GetTraits([FromQuery] Guid id)
        {
            //var userId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            var result = await _charServices.GetCharacterById(id);

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
        [HttpGet()]
        public async Task<IActionResult> GetAllChars()
        {
            var result = await _charServices.GetAllChars();

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
        [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> CreateCharacter([FromForm] CharacterCreateModel model)
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
                var result = await _charServices.NewChar(model, userId);

                return result ? Ok(new { Message = "pg created!" }) : BadRequest(new { Message = "Something went wrong!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }



        [Authorize]
        [HttpGet("user")]
        public async Task<IActionResult> GetUserCharacters()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var characters = await _charServices.GetUserChars(userId);
            if (characters == null)
            {
                return BadRequest(new
                {
                    message = "Qualcosa è andato storto!"
                });
            }

            return Ok(new
            {
                data = characters
            });
        }
    }
}
