namespace SpaceWise.Models
{
    public class User
    {
        public required int Id { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }
        public required ICollection<Blogpost> Blogposts { get; set; }
    }
}
