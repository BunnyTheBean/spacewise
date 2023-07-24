using Microsoft.EntityFrameworkCore;
using SpaceWise.Models;

namespace SpaceWise.Database
{
    public class SpaceWiseDbContext : DbContext
    {
        public SpaceWiseDbContext(DbContextOptions<SpaceWiseDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
    }
}
