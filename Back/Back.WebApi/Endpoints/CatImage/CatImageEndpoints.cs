using Back.Infra.Repository;
using Microsoft.EntityFrameworkCore;

namespace Back.WebApi.Endpoints.CatImage;

/// <summary>
/// Provides endpoints for managing cat images.
/// </summary> 

public static class CatImageEndpoints
{
    /// <summary>
    /// </summary>    
    public static void MapCatImageEndpoints(this WebApplication app)
    {
        RouteGroupBuilder group = app.MapGroup("/catimages")
            .WithName("CatImages");

        group.MapGet("", GetAllCatImages).WithName("GetAllCatImages");
        group.MapGet("/{id}", GetCatImageById).WithName("GetCatImageById");
        group.MapPost("", CreateCatImage).WithName("CreateCatImage");
    }

    private static async Task<IResult> GetAllCatImages(CatMashDBContext context)
    {
        Console.WriteLine("Fetching all cat images from the database...");
        List<Infra.Repository.CatImage>? catImages = await context.CatImages.ToListAsync();
        return Results.Ok(catImages);
    }

    private static async Task<IResult> GetCatImageById(string id, CatMashDBContext context)
    {
        Console.WriteLine($"Fetching cat image with ID {id} from the database...");
        Infra.Repository.CatImage? catImage = await context.CatImages.FindAsync(id);
        return catImage == null ? Results.NotFound() : Results.Ok(catImage);
    }

    private static async Task<IResult> CreateCatImage(Infra.Repository.CatImage catImage, CatMashDBContext context)
    {
        Console.WriteLine("Creating a new cat image in the database...");
        context.CatImages.Add(catImage);
        await context.SaveChangesAsync();
        return Results.Created($"/catimages/{catImage.Id}", catImage);
    }
}
