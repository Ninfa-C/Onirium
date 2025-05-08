using BaseModelWebApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OniriumBE.DTOs.Account;
using OniriumBE.Models.Campaign;

namespace OniriumBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvitiController : ControllerBase
    {
        private readonly EmailServices _emailService;

        public InvitiController(EmailServices emailService)
        {
            _emailService = emailService;
        }

        [HttpPost]
        public async Task<IActionResult> Invia([FromBody] InviteRequest model)
        {

            await _emailService.SendPlayerInviteEmailAsync(model);

            return Ok(new { message = "Inviti inviati." });
        }

        [HttpPost("conferma")]
        public async Task<IActionResult> ConfermaInvito([FromQuery] Guid campaignId, [FromQuery] Guid token)
        {
            var (success, message) = await _emailService.ConfermaInvitoAsync(campaignId, token, User);

            if (!success)
                return BadRequest(new { message });

            return Ok(new { message });
        }



    }
}
