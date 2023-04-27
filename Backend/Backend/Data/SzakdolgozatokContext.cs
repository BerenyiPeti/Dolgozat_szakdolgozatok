using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class SzakdolgozatokContext: DbContext
    {
        public SzakdolgozatokContext(DbContextOptions<SzakdolgozatokContext> options) :
            base(options){ }

        public DbSet<Szakdolgozat>Szakdolgozatok { get; set; } 
    }
}
