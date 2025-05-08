using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OniriumBE.Data;
using OniriumBE.DTOs.ItemsDtos;
using OniriumBE.DTOs.ItemsDtos.ShowInfoModels;
using OniriumBE.Services;

namespace OniriumBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemComtroller : ControllerBase
    {
        private readonly ItemService _itemService;

        public ItemComtroller(ItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetObjects([FromQuery] string? category)
        {
            var result = await _itemService.GetItems(category);

            if (result == null)
            {
                return BadRequest(new
                {
                    message = "Qualcosa è andato storto!"
                });
            }

            var count = result.Count();
            var text = count == 1 ? $"{count} oggetto trovato" : $"{count} oggetti trovati";

            return Ok(new
            {
                message = text,
                data = result
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetItemById(Guid id)
        {
            var item = await _itemService.GeSingleItem(id);
            if (item == null)
                return NotFound();

            return Ok(item);
        }

        [HttpPost]
        public async Task<ActionResult> CreateItem([FromBody] ItemCreateModel dto)
        {
            var item = await _itemService.CreateItemAsync(dto);
            if (item == null) return BadRequest("Categoria non valida");

            return CreatedAtAction(nameof(GetItemById), new { id = item.Id }, item);
        }

    }
}
