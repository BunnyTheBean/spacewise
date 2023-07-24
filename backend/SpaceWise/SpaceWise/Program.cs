using SpaceWise.Database;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("SpaceWise") ?? "Data Source=SpaceWise.db";

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSqlite<SpaceWiseDbContext>(connectionString);
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
