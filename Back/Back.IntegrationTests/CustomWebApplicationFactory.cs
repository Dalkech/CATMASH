using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Back.Infra.Repository;
using Back.Domain;

public class CustomWebApplicationFactory<TProgram> : WebApplicationFactory<TProgram>, IAsyncLifetime 
    where TProgram : class
{
    private readonly string _dbName = "CatMashTestDb_" + Guid.NewGuid();

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            var descriptor = services.SingleOrDefault(d => d.ServiceType == typeof(DbContextOptions<CatMashDBContext>));
            if (descriptor != null)
            {
                services.Remove(descriptor);
            }

            services.AddDbContext<CatMashDBContext>(options =>
            {
                options.UseInMemoryDatabase(_dbName);
            });
        });
    }

    public async Task InitializeAsync()
    {
        // Seed data after factory is built
        using var scope = Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<CatMashDBContext>();
        db.Database.EnsureDeleted(); // Clean slate
        db.CatImages.AddRange(
            new CatImage { Id = "xyz", Url = "https://example.com/xyz.jpg" },
			new CatImage { Id = "azo", Url = "https://example.com/aca.jpg", Score = 1600 },
            new CatImage { Id = "aca", Url = "https://example.com/aca.jpg" },
			new CatImage { Id = "azerty", Url = "https://example.com/xyz.jpg", Score = 2000 },
			new CatImage { Id = "666", Url = "https://example.com/xyz.jpg" }
        );
        await db.SaveChangesAsync();
    }

    public Task DisposeAsync() => Task.CompletedTask;
}