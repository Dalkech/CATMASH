using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Back.Infra.Repository;

public static class CatMashDbServiceRegistration
{
    public static void AddDbContext(this IServiceCollection services, string dbName = "InMemoryCatMashDb" )
    {
        services.AddDbContext<CatMashDBContext>(options =>
            options.UseInMemoryDatabase(dbName)
        );

        services.AddScoped<ICatImageRepository, CatImageRepository>();
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