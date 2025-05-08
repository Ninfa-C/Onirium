using OniriumBE.Data;

namespace OniriumBE.Services
{
    public class ShopService
    {
        private ApplicationDbContext _context;
        private ShareServices _services;

        public ShopService(ApplicationDbContext context, ShareServices services)
        {
            _context = context;
            _services = services;
        }
    }
}
