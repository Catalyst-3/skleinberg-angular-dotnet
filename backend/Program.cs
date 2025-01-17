using Microsoft.EntityFrameworkCore;
using backend.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>(opt => 
{    
    var connStringBuilder = new Npgsql.NpgsqlConnectionStringBuilder
    {
        Host = Environment.GetEnvironmentVariable("DB_HOST"),
        Port = int.Parse(Environment.GetEnvironmentVariable("DB_PORT") ?? "5432"),
        Database = Environment.GetEnvironmentVariable("DB_NAME"),
        Username = Environment.GetEnvironmentVariable("DB_USER"),
        Password = Environment.GetEnvironmentVariable("DB_PASSWORD")
    };
    opt.UseNpgsql(connStringBuilder.ConnectionString);
});
builder.Services.AddCors();

var app = builder.Build();


//configure http request pipeline
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins(
    "http://localhost:4200", "https://localhost:4200"
    ));
app.MapControllers();

app.Run();
