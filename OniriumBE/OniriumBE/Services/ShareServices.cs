using Microsoft.EntityFrameworkCore;
using OniriumBE.Data;
using Serilog;

namespace OniriumBE.Services
{
    public class ShareServices
    {
        private ApplicationDbContext _context;
        public ShareServices(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool> SaveAsync()
        {
            try
            {
                var result = await _context.SaveChangesAsync();
                if (result > 0)
                {
                    Log.Information("Salvataggio completato con successo: {Changes} modifiche applicate", result);
                }
                else
                {
                    Log.Warning("Nessuna modifica salvata nel database.");
                }
                return result > 0;
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Errore durante il salvataggio dei dati nel database.");
                return false;
            }
        }
    }
}
