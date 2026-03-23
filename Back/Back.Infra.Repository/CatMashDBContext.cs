namespace Back.Infra.Repository;

using System.Text.Json;
using System.Net.Http;
using Microsoft.EntityFrameworkCore;

public class CatMashDBContext : DbContext
{
    public DbSet<CatImage> CatImages { get; set; }

    public CatMashDBContext(DbContextOptions<CatMashDBContext> options) 
        : base(options)
    {
    }

    private static string jsonUrl = "https://conseil.latelier.co/data/cats.json";
    private static JsonSerializerOptions jsonOptions = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
    public static async Task SeedFromJsonUrlAsync(CatMashDBContext context)
    {
        try
        {
            using var httpClient = new HttpClient();
            var response = await httpClient.GetAsync(jsonUrl);
            response.EnsureSuccessStatusCode();
            
            Console.WriteLine($"Successfully fetched JSON data from URL: \n{jsonUrl}");
            var json = await response.Content.ReadAsStringAsync();
            
            // Deserialize the wrapper object containing the "images" array
            var response_obj = JsonSerializer.Deserialize<CatImagesResponse>(json, jsonOptions);
            if (response_obj?.Images != null && response_obj.Images.Count > 0)
            {
                context.CatImages.AddRange(response_obj.Images);
                await context.SaveChangesAsync();
                Console.WriteLine($"Successfully seeded {response_obj.Images.Count} cat images from URL: {jsonUrl}");
            }
            else {
                Console.WriteLine($"No cat images found in the JSON data from URL: {jsonUrl}");
            }
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException($"Failed to seed database from URL: {jsonUrl}", ex);
        }
    }
}
