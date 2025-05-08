using System.Security.Claims;
using Azure;
using BaseModelWebApi.Models.Email;
using CustomersManager.Models.Auth;
using FluentEmail.Core;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OniriumBE.Data;
using OniriumBE.DTOs.Account;
using OniriumBE.Models.Campaign;

namespace BaseModelWebApi.Services
{
    public class EmailServices
    {
        private readonly IFluentEmail _email;
        private ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        public EmailServices(IFluentEmail fluentEmail, ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _email = fluentEmail;
            _context = context;
            _userManager = userManager;
        }

        public async Task<bool> SendConfirm( string email, string name, string confirmationLink)
        {
            var htmlTemplatePath = Path.Combine("EmailTemplates", "conferma-email.html");

            if (!System.IO.File.Exists(htmlTemplatePath))
                throw new FileNotFoundException("Il file HTML dell'email non è stato trovato.");

            var htmlTemplate = await System.IO.File.ReadAllTextAsync(htmlTemplatePath);

            var allSuccess = true;


            var html = htmlTemplate
                .Replace("Mario Rossi", name)
                .Replace("https://example.com/confirm?token=abc123", confirmationLink);

            var result = await _email
                .To(email)
                .Subject($"🎲 Conferma Email 🎲")
                .Body(html, true)
                .SendAsync();

            if (!result.Successful)
                allSuccess = false;

            return result.Successful;
        }

        public async Task<bool> SendPlayerInviteEmailAsync(InviteRequest model)
        {
            var htmlTemplatePath = Path.Combine("EmailTemplates", "invito-email.html");

            if (!System.IO.File.Exists(htmlTemplatePath))
                throw new FileNotFoundException("Il file HTML dell'email non è stato trovato.");

            var htmlTemplate = await System.IO.File.ReadAllTextAsync(htmlTemplatePath);

            var allSuccess = true;

            foreach (var user in model.Users)
            {
                var token = Guid.NewGuid();
                // var link = $"https://valaxma.com/inviti/campagna/{model.CampaignId}?token={token}";
                var link = $"http://localhost:5173/inviti/campagna/{model.CampaignId}?token={token}";

                _context.CampaignInviteTokens.Add(new CampaignInviteToken
                {
                    Token = token,
                    CampaignId = model.CampaignId,
                    Role = "Player",
                    Email = user.Email,
                });

                var html = htmlTemplate
                    .Replace("Mario Rossi", user.Name)
                    .Replace("Campagna Epica", model.CampaignName)
                    .Replace("MasterYoda", model.InviterName)
                    .Replace("https://valazma.com/inviti/campagna/abc123?token=xyz456", link);

                var result = await _email
                    .To(user.Email)
                    .Subject($"🎲 Invito alla campagna: {model.CampaignName}")
                    .Body(html, true)
                    .SendAsync();

                if (!result.Successful)
                    allSuccess = false;
            }

            await _context.SaveChangesAsync();

            return allSuccess;
        }

        public async Task<(bool Success, string Message)> ConfermaInvitoAsync(Guid campaignId, Guid token, ClaimsPrincipal userClaims)
        {
            var invite = await _context.CampaignInviteTokens
                .FirstOrDefaultAsync(i => i.Token == token && i.CampaignId == campaignId && !i.IsUsed);

            if (invite == null)
                return (false, "Invito non valido o già utilizzato.");

            var user = await _userManager.GetUserAsync(userClaims);
            if (user == null)
                return (false, "Utente non autenticato.");

            var playerExists = await _context.PlayerCampaign
                .AnyAsync(p => p.CampaignId == campaignId && p.UserId == user.Id);

            if (!playerExists)
            {
                _context.PlayerCampaign.Add(new Players
                {
                    CampaignId = campaignId,
                    UserId = user.Id,
                    Role = "Player"
                });
            }

            invite.IsUsed = true;
            await _context.SaveChangesAsync();

            return (true, "Invito accettato.");
        }



    }
}
