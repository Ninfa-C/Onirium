using OniriumBE.Data;

namespace OniriumBE.Services
{
    public class ClassService
    {
        private ApplicationDbContext _context;
        private ShareServices _services;

        public ClassService(ApplicationDbContext context, ShareServices services)
        {
            _context = context;
            _services = services;
        }
    }
}
