using Microsoft.EntityFrameworkCore;
using SpaceWise.Models;

namespace SpaceWise.Database
{
    public class SpaceWiseDbContext : DbContext
    {
        public SpaceWiseDbContext(DbContextOptions<SpaceWiseDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Blogpost>()
                .HasOne(e => e.User)
                .WithMany()
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder
                .Entity<Blogpost>()
                .HasMany(e => e.Sections)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
        }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Blogpost> Blogposts { get; set; } = null!;
        public DbSet<BlogpostSection> BlogpostSections { get; set;} = null!;

    }
}
