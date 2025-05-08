using CustomersManager.Models.Auth;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OniriumBE.DTOs.Character
{
    public class StatsDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}
