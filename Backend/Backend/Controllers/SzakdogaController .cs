using Backend.Data;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpGet]
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

        [HttpPost]
        public async Task<ActionResult<List<Szakdolgozat>>> ujSzakdoga(Szakdolgozat sz)
        {
            _context.Szakdolgozatok.Add(sz);
            await _context.SaveChangesAsync();

            return Ok(await _context.Szakdolgozatok.ToListAsync());
        }
    }
}
