using NuGet.Protocol;
using SpaceWise.Database;
using SpaceWise.Models;
using SpaceWise.Models.Enums;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("SpaceWise") ?? "Data Source=SpaceWise.db";

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSqlite<SpaceWiseDbContext>(connectionString);
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "Angular",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
        });
});
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("Angular");
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseAuthorization();
app.MapControllers();

//var post = new Blogpost
//{
//    Id = 123,
//    Sections = new List<BlogpostSection> { 
//        new BlogpostSection
//        {
//            Title = "Main Header",
//            Content = "bla bla bla hello"
//        },
//        new BlogpostSection
//        {
//            Title = "Subheader",
//            Content = "So much content, yay"
//        }
//    },
//    Category = BlogpostCategory.Technology,
//    Tags = new List<string> { "techno", "blargh" },
//    Image = "test.jpg",
//    User = new User
//    {
//        Id = 1,
//        Username = "Bob",
//        Password = "bobspw"
//    }
//};

app.Run();
