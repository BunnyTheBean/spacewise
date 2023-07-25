using SpaceWise.Database;

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

app.Run();
