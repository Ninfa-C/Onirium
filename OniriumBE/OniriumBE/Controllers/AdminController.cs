using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OniriumBE.DTOs.AttackSpells;
using OniriumBE.DTOs.Background;
using OniriumBE.DTOs.Character;
using OniriumBE.DTOs.Class;
using OniriumBE.Models.AttackSpells;
using OniriumBE.Models.Char;
using OniriumBE.Models.Char.Backgrounds;
using OniriumBE.Models.Char.Classes;
using OniriumBE.Models.Char.Races;
using OniriumBE.Services;
using static System.Net.Mime.MediaTypeNames;

namespace OniriumBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly AdminService _adminServices;

        public AdminController(AdminService services)
        {
            _adminServices = services;
        }
        [HttpGet("skill")]
        public async Task<IActionResult> GetSkills()
        {
            var result = await _adminServices.GetAllSkill();

            if (result == null)
            {
                return BadRequest(new
                {
                    message = "Qualcosa è andato storto!"
                });
            }

            var count = result.Count();

            var text = count == 1 ? $"{count} abilità trovata" : $"{count} abilità trovate";

            return Ok(new
            {
                message = text,
                data = result
            });
        }
        [HttpGet("stats")]
        public async Task<IActionResult> GetStats()
        {
            var result = await _adminServices.GetAllStats();

            if (result == null)
            {
                return BadRequest(new
                {
                    message = "Qualcosa è andato storto!"
                });
            }

            var count = result.Count();

            var text = count == 1 ? $"{count} stats trovata" : $"{count} stats trovate";

            return Ok(new
            {
                message = text,
                data = result
            });
        }
        [HttpGet("class")]
        public async Task<IActionResult> GetClasses()
        {
            var result = await _adminServices.GetAllClasses();

            if (result == null)
            {
                return BadRequest(new
                {
                    message = "Qualcosa è andato storto!"
                });
            }

            var count = result.Count();

            var text = count == 1 ? $"{count} classe trovata" : $"{count} classi trovate";

            return Ok(new
            {
                message = text,
                data = result
            });
        }

        [HttpPost("class/selected")]
        public async Task<IActionResult> GetSelectedClasses([FromBody] SelectedClassesRequest request)
        {
            var result = await _adminServices.GetSelectedClassesAndSubclassesAsync(request.ClassIds, request.SubclassIds);

            if (result == null || result.Count == 0)
            {
                return BadRequest(new
                {
                    message = "Nessuna classe trovata!"
                });
            }

            var count = result.Count;
            var text = count == 1 ? $"{count} classe trovata" : $"{count} classi trovate";

            return Ok(new
            {
                message = text,
                data = result
            });
        }
        [HttpPost("traits/preview")]
        public async Task<IActionResult> GetTraitPreview([FromBody] TraitQueryModel model)
        {
            var result = await _adminServices.GetAvailableTraitsAsync(model);
            return Ok(new
            {
                data = result
            });
        }
        [HttpGet("races")]
        public async Task<IActionResult> GetRaces()
        {
            var result = await _adminServices.GetAllRaces();

            if (result == null)
            {
                return BadRequest(new
                {
                    message = "Qualcosa è andato storto!"
                });
            }

            var count = result.Count();

            var text = count == 1 ? $"{count} razza trovata" : $"{count} incantesimi trovati";

            return Ok(new
            {
                message = text,
                data = result
            });
        }
        [HttpGet("privileges")]
        public async Task<IActionResult> GetTraits()
        {
            var result = await _adminServices.GetAllPrivilees();

            if (result == null)
            {
                return BadRequest(new
                {
                    message = "Qualcosa è andato storto!"
                });
            }

            var count = result.Count();

            var text = count == 1 ? $"{count} tratto trovato" : $"{count} tratti trovati";

            return Ok(new
            {
                message = text,
                data = result
            });
        }
        [HttpPost("privileges")]
        public async Task<IActionResult> CreateTrait([FromBody] List<AddPrivilege> model)
        {
            try
            {

                var traits = model.Select(model => new BackgroundPrivilege()
                {
                    Id = Guid.NewGuid(),
                    Name = model.Name,
                    Description = model.Description,
                    IsCustom = model.IsCustom
                }).ToList();

                var result = await _adminServices.NewTrait(traits);

                return result ? Ok(new { Message = "trait created!" }) : BadRequest(new { Message = "Something went wrong!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("feature")]
        public async Task<IActionResult> GetFeatures()
        {
            var result = await _adminServices.GetAllFeatures();

            if (result == null)
            {
                return BadRequest(new
                {
                    message = "Qualcosa è andato storto!"
                });
            }

            var count = result.Count();

            var text = count == 1 ? $"{count} tratto trovato" : $"{count} tratti trovati";

            return Ok(new
            {
                message = text,
                data = result
            });
        }
        [HttpPost("feature")]
        public async Task<IActionResult> CreateFeature([FromBody] List<AddPrivilege> model)
        {
            try
            {

                var traits = model.Select(model => new ClassFeatures()
                {
                    Id = Guid.NewGuid(),
                    Name = model.Name,
                    Description = model.Description,
                    IsCustom = model.IsCustom
                }).ToList();

                var result = await _adminServices.NewFeature(traits);

                return result ? Ok(new { Message = "trait created!" }) : BadRequest(new { Message = "Something went wrong!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("raceTrait")]
        public async Task<IActionResult> GetRacialTraits()
        {
            var result = await _adminServices.GetAllRacialTraits();

            if (result == null)
            {
                return BadRequest(new
                {
                    message = "Qualcosa è andato storto!"
                });
            }

            var count = result.Count();

            var text = count == 1 ? $"{count} tratto trovato" : $"{count} tratti trovati";

            return Ok(new
            {
                message = text,
                data = result
            });
        }
        [HttpPost("raceTrait")]
        public async Task<IActionResult> CreateRacialTrait([FromBody] List<AddPrivilege> model)
        {
            try
            {

                var traits = model.Select(model => new RacialTraits()
                {
                    Id = Guid.NewGuid(),
                    Name = model.Name,
                    Description = model.Description,
                    IsCustom = model.IsCustom
                }).ToList();

                var result = await _adminServices.NewRacialTrait(traits);

                return result ? Ok(new { Message = "trait created!" }) : BadRequest(new { Message = "Something went wrong!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("background")]
        public async Task<IActionResult> GetBg()
        {
            var result = await _adminServices.GetAllBg();

            if (result == null)
            {
                return BadRequest(new
                {
                    message = "Qualcosa è andato storto!"
                });
            }

            var count = result.Count();

            var text = count == 1 ? $"{count} background trovato" : $"{count} background trovati";

            return Ok(new
            {
                message = text,
                data = result
            });
        }
        [HttpPost("background")]
        public async Task<IActionResult> CreateBackground([FromBody] BackgroundCreateModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (model.IsCustom && string.IsNullOrEmpty(userId))
                    return Unauthorized("Must be logged in for custom backgrounds");

                var newSkillEntities = new List<Skill>();
                if (model.NewSkills != null && model.NewSkills.Any())
                {
                    foreach (var item in model.NewSkills)
                    {
                        var dto = new Skill
                        {
                            Id = Guid.NewGuid(),
                            Name = item.Name,
                            Description = item.Description,
                            IsCustom = true,
                            UserId = userId,
                            CreatedAd = DateTime.UtcNow,
                            StatId = item.StatId,

                        };
                        await _adminServices.NewSkill(dto);
                    }
                }

                var allSkillIds = model.SkillIds.Concat(newSkillEntities.Select(s => s.Id)).ToList();

                var newModel = new List<Background>
                {
                    new Background
                    {
                    Id = Guid.NewGuid(),
                    Name = model.Name,
                    Description = model.Description,
                    IsCustom = model.IsCustom,
                    UserId = model.IsCustom ? userId : null,
                    CreatedAt = DateTime.UtcNow,
                    BackgroundSkills = allSkillIds.Select(id => new BackgroundSkill { SkillId = id }).ToList(),
                    BackgroundPrivileges = model.PrivilegeId?
                    .Select(pid => new BackgroundPrivilegeAssignment { TraitId = pid })
                    .ToList() ?? new List<BackgroundPrivilegeAssignment>()
                    }
                };

                var result = await _adminServices.NewBg(newModel);

                return result ? Ok(new { Message = "Background created!" }) : BadRequest(new { Message = "Something went wrong!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPut("backgroundTrait")]
        public async Task<IActionResult> EditBg([FromQuery] Guid id, [FromBody] List<Guid> privilegeIds)
        {

            var result = await _adminServices.UpdateBackgroundPrivileges(id, privilegeIds);

            return result ? Ok(new { message = "background aggiornato!" }) : BadRequest(new { message = "Something went wrong" });
        }




    }
}
