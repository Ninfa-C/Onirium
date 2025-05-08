using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OniriumBE.DTOs.AttackSpells;
using OniriumBE.Models.AttackSpells;
using OniriumBE.Services;

namespace OniriumBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpellController : ControllerBase
    {
        private readonly AttackSpellsService _spellServices;

        public SpellController(AttackSpellsService services)
        {
            _spellServices = services;
        }

        [HttpGet]
        public async Task<IActionResult> GetSpells([FromQuery] string? level, [FromQuery] string? className, [FromQuery] bool custom = false, [FromQuery] string? multiClass = null)
        {
            var result = await _spellServices.GetSpells(level, className, custom, multiClass);

            if (result == null)
            {
                return BadRequest(new
                {
                    message = "Qualcosa è andato storto!"
                });
            }

            var count = result.Count();

            var text = count == 1 ? $"{count} incantesimo trovato" : $"{count} incantesimi trovati";

            return Ok(new
            {
                message = text,
                data = result
            });
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddSpellModel model)
        {
            try
            {
                //string webPath = null;
                //if (model.Image != null)
                //{
                //    var fileName = model.Image.FileName;
                //    var path = Path.Combine(Directory.GetCurrentDirectory(), "assets", "images", fileName);
                //    await using (var stream = new FileStream(path, FileMode.Create))
                //    {
                //        await model.Image.CopyToAsync(stream);
                //    }
                //    webPath = Path.Combine("assets", "images", fileName);
                //}
                var newSpell = new Spell()
                {
                    Id = Guid.NewGuid(),
                    Name = model.Name,
                    //Image = webPath,
                    LevelId = Guid.Parse(model.LevelId),
                    SchoolId = Guid.Parse(model.SchoolId),
                    IsConcentration = model.IsConcentration,
                    IsRitual = model.IsRitual,
                    Description = model.Description,
                    ExtraDescription = model.ExtraDescription,
                    CostId = Guid.Parse(model.CostId),
                    SavingThrowId = Guid.Parse(model.SavingThrowId),
                    ComponentsId = Guid.Parse(model.Components),
                    Range = model.Range,
                    DurationId = Guid.Parse(model.DurationId)
                };
                var result = await _spellServices.NewSpell(newSpell, model.Damage);

                return result ? Ok(new { Message = "Spell created!" }) : BadRequest(new { Message = "Something went wrong!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("spell/{id}")]
        public async Task<IActionResult> GetSpell(Guid id)
        {
            var spell = await _spellServices.GetSpellById(id);
            if (spell == null)
            {
                return NotFound();
            }
            return Ok(spell);
        }


    }
}
