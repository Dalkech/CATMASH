using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Back.Infra.Repository;

public static class CatMashDbServiceRegistration
{
    public static void AddDbContext(this WebApplicationBuilder builder, string dbName = "InMemoryCatMashDb" )
    {
        builder.Services.AddDbContext<CatMashDBContext>(options =>
            options.UseInMemoryDatabase(dbName)
        );

        builder.Services.AddScoped<ICatRepository, CatRepository>();
    }

    /// <summary>
    /// Seed the database with cat images from the JSON URL
    /// </summary>
    /// <param name="app"></param>
    public static async Task SetDbContextAsync(this WebApplication app)
    {
        Console.WriteLine($"{nameof(CatMashDBContext)}: Seeding dataContext ...");

        using IServiceScope scope = app.Services.CreateScope();
        CatMashDBContext context = scope.ServiceProvider.GetRequiredService<CatMashDBContext>();
        await CatMashDBContext.SeedFromJsonUrlAsync(context);
    }
}