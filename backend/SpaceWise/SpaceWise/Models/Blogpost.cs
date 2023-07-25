using SpaceWise.Models.Enums;

namespace SpaceWise.Models
{
    public class Blogpost
    {
        public int Id { get; set; }
        public ICollection<BlogpostSection>? Sections { get; set; }
        public BlogpostCategory? Category { get; set; }
        public string? Image { get; set; }
        public User? User { get; set; }
    }
}
