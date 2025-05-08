using OniriumBE.Data;

namespace OniriumBE.Services
{
    public class ModService
    {
        private ApplicationDbContext _context;
        private ShareServices _services;

        public ModService(ApplicationDbContext context, ShareServices services)
        {
            _context = context;
            _services = services;
        }
    }
}
