using Backend.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Backend.Controllers
{
    [EnableCors]
    [Route("szakdogak")]
    [ApiController]
    public class SzakdogaController : ControllerBase
    {
        private SzakdolgozatokContext _context;

        public SzakdogaController(SzakdolgozatokContext context)
        {
            _context = context;
        }

        [HttpGet("list")]

        public IActionResult List()
        {
            try
            {
                var list =
            _context.Szakdolgozatok.ToList();

                if (list.Count() == 0)
                {
                    return NotFound("table not found.");
                }
                return Ok(list);

            }
            catch (Exception e)
            {
                return StatusCode(404, e);
            }
        }

       
        [HttpPost("new")]
        public async Task<ActionResult<List<Szakdolgozat>>> ujSzakdoga(Szakdolgozat sz)
        {
            try
            {
                _context.Szakdolgozatok.Add(sz);
                await _context.SaveChangesAsync();
                //return Ok(await _context.Szakdolgozatok.ToListAsync());
                return Ok(sz);

            }
            catch (Exception e)
            {

                return BadRequest(e);
            }     
        }

        [HttpPut("update")]

        public async Task<ActionResult<List<Szakdolgozat>>> updateSzakdoga(Szakdolgozat sz)
        {
            var szakdoga = await _context.Szakdolgozatok.FindAsync(sz.id);
            if (szakdoga == null)
                return BadRequest("Nincs ilyen szakdolgozat");

            szakdoga.szakdoga_nev = sz.szakdoga_nev;
            szakdoga.githublink = sz.githublink;
            szakdoga.oldallink = sz.oldallink;  
            szakdoga.tagokneve = sz.tagokneve;

            await _context.SaveChangesAsync();

            return Ok(await _context.Szakdolgozatok.ToListAsync());
        }

        [HttpDelete("delete/{id}")]

        public async Task<ActionResult<List<Szakdolgozat>>> deleteSzakdoga(int id)
        {
            var szakdoga = await _context.Szakdolgozatok.FindAsync(id);
            if (szakdoga == null)
                return BadRequest("Nincs ilyen szakdolgozat");

            _context.Szakdolgozatok.Remove(szakdoga);
            await _context.SaveChangesAsync();

            return Ok(await _context.Szakdolgozatok.ToListAsync());
        }

    }
}
