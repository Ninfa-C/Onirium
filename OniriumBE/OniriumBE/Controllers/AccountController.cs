using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BaseModelWebApi.Services;
using CustomersManager.DTOs.Account;
using CustomersManager.Models.Auth;
using CustomersManager.Settings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using OniriumBE.DTOs.Account;
using OniriumBE.Models.Char;

namespace BaseModelWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly Jwt _jwtSettings;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly EmailServices _emailService;

        public AccountController(IOptions<Jwt> jwtOptions, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, RoleManager<ApplicationRole> roleManager, EmailServices emailService)
        {
            _jwtSettings = jwtOptions.Value;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _emailService = emailService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            var newUser = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                Name = model.Name,
                Surname = model.Surname,
                IsDeleted = false
            };
            var result = await _userManager.CreateAsync(newUser, model.Password);
            if (!result.Succeeded)
            {
                return BadRequest();
            }

            var token = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);
            var confirmationLink = $"http://localhost:5173/conferma-email?userId={newUser.Id}&token={Uri.EscapeDataString(token)}";
            var email = await _emailService.SendConfirm(model.Email, model.Name, confirmationLink);
            var userCount = _userManager.Users.Count();
            var roleToAssign = userCount == 1 ? "Admin" : "User";
            await _userManager.AddToRoleAsync(newUser, roleToAssign);
            return Ok();
        }

        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null) return BadRequest("Utente non trovato");

            var result = await _userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                return Ok("Email confermata con successo!");
            }
            return BadRequest("Errore nella conferma dell'email.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null || user.IsDeleted)
            {
                return Unauthorized("Credenziali non valide o account disattivato.");
            }

            await _signInManager.PasswordSignInAsync(user, model.Password, false, false);

            var roles = await _signInManager.UserManager.GetRolesAsync(user);

            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id));
            claims.Add(new Claim(ClaimTypes.Email, user.Email));
            claims.Add(new Claim(ClaimTypes.GivenName, $"{user.Name} {user.Surname}"));
            claims.Add(new Claim("email", user.Email));
            claims.Add(new Claim("name", user.UserName));
            claims.Add(new Claim("realName", user.Name));
            claims.Add(new Claim("surname", user.Surname));
            claims.Add(new Claim("profilePic", user.ProfilePictureUrl ?? ""));
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
                claims.Add(new Claim("role", role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecurityKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expiry = DateTime.Now.AddMinutes(_jwtSettings.ExpiresInMinutes);

            var token = new JwtSecurityToken(_jwtSettings.Issuer, _jwtSettings.Audience, claims, expires: expiry, signingCredentials: creds);

            string tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            return Ok(new TokenResponse()
            {
                Token = tokenString,
                Expires = expiry
            });
        }

        [Authorize]
        [HttpPut("update-profile-picture")]
        public async Task<IActionResult> UpdateProfilePicture([FromForm] ImageDto dto)
        {
            try
            {
                var user = await _userManager.GetUserAsync(User);
                if (user == null) return NotFound("Utente non trovato");

                string webPath = user.ProfilePictureUrl;
                if (dto.Image != null)
                {
                    if (!string.IsNullOrEmpty(user.ProfilePictureUrl))
                    {
                        var oldImagePath = Path.Combine(Directory.GetCurrentDirectory(), user.ProfilePictureUrl.TrimStart('/'));
                        if (System.IO.File.Exists(oldImagePath))
                        {
                            System.IO.File.Delete(oldImagePath);
                        }
                    }
                    var fileName = dto.Image.FileName;
                    var path = Path.Combine(Directory.GetCurrentDirectory(), "assets", "images", fileName);

                    await using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await dto.Image.CopyToAsync(stream);
                    }
                    webPath = "assets/images/" + fileName;
                }

                user.ProfilePictureUrl = webPath;
                var result = await _userManager.UpdateAsync(user);

                if (!result.Succeeded)
                    return BadRequest(result.Errors);

                return Ok(new { message = "ok" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Errore interno: {ex.Message}");
            }
        }

        [Authorize]
        [HttpPut("update-username")]
        public async Task<IActionResult> UpdateUsername([FromBody] string newUsername)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return NotFound("Utente non trovato");

            var result = await _userManager.SetUserNameAsync(user, newUsername);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { message = "ok" });
        }

        [Authorize]
        [HttpPut("update-email")]
        public async Task<IActionResult> UpdateEmail([FromBody] UpdateEmailDto dto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return NotFound("Utente non trovato");

            var passwordCheck = await _userManager.CheckPasswordAsync(user, dto.CurrentPassword);
            if (!passwordCheck)
                return Unauthorized("Password attuale non corretta");

            var result = await _userManager.SetEmailAsync(user, dto.NewEmail);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { message = "ok" });
        }

        [Authorize]
        [HttpPut("update-password")]
        public async Task<IActionResult> UpdatePassword([FromBody] ChangePasswordDto dto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return NotFound("Utente non trovato");

            var result = await _userManager.ChangePasswordAsync(user, dto.CurrentPassword, dto.NewPassword);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new { message = "ok" });
        }
        [Authorize]
        [HttpDelete("delete-profile")]
        public async Task<IActionResult> DeleteProfile([FromBody] string confirmPassword)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return NotFound("Utente non trovato");
            var checkPassword = await _signInManager.CheckPasswordSignInAsync(user, confirmPassword, lockoutOnFailure: false);
            if (!checkPassword.Succeeded)
                return Unauthorized("Password errata.");

            if (user.IsDeleted)
                return BadRequest("Profilo già eliminato.");

            user.IsDeleted = true;
            await _userManager.UpdateAsync(user);

            return Ok(new {message =  "Profilo eliminato (soft delete)."});
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> GetProfile()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return NotFound();
            var roles = await _userManager.GetRolesAsync(user);
            return Ok(new
            {
                user.UserName,
                user.Email,
                user.Name,
                user.Surname,
                user.ProfilePictureUrl,
                Roles = roles
            });
        }
    }
}
