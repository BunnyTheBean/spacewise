using SpaceWise.Models.Enums;

namespace SpaceWise.Models
{
    public class Blogpost
    {
        public required int Id { get; set; }
        public required ICollection<BlogpostSection> Sections { get; set; }
        public required BlogpostCategory Category { get; set; }
        public required string Image { get; set; }
        public required int UserId { get; set; }
        public required User User { get; set; }
    }
}
