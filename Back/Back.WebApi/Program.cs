using Back.Infra.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

Console.WriteLine("Configuring services...");

// Register CatMashDBContext with in-memory database
builder.Services.AddDbContext<CatMashDBContext>(options =>
    options.UseInMemoryDatabase("CatMashDb"));

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

Console.WriteLine("Seeding dataContext...");

// Seed data after building the app
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<CatMashDBContext>();
    await CatMashDBContext.SeedFromJsonUrlAsync(context);
}

app.MapGet("/", () => "Hello World!");

// Get all cats from the bootstrapped database
app.MapGet("/catimages", async (CatMashDBContext context) =>
{
    Console.WriteLine("Fetching all cat images from the database...");
    var catImages = await context.CatImages.ToListAsync();
    return Results.Ok(catImages);
});

// Get a specific cat by ID
app.MapGet("/catimages/{id}", async (int id, CatMashDBContext context) =>
{
    Console.WriteLine($"Fetching cat image with ID {id} from the database...");
    var catimages = await context.CatImages.FindAsync(id);
    return catimages == null ? Results.NotFound() : Results.Ok(catimages);
});

app.Run();
