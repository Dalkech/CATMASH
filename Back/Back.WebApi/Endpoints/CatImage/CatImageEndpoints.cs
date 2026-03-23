using Back.Infra.Repository;
using Microsoft.AspNetCore.Http.HttpResults;

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
    }


    private static async Task<IResult> GetAllCatImages(ICatRepository catRepository)
    {
        Console.WriteLine("Fetching all cat images from the database...");
        
        List<Infra.Repository.CatImage>? catImages = await catRepository.GetAllAsync();
        List<DTOs.CatImage> results = DTOs.CatImage.ToDTOFromList(catImages);
        return TypedResults.Ok(results);
    }

    private static async Task<Results<Ok<DTOs.CatImage>, NotFound>> GetCatImageById(string id, ICatRepository catRepository)
    {
        Console.WriteLine($"Fetching cat image with ID {id} from the database...");
        
        Infra.Repository.CatImage? catImage = await catRepository.GetByIdAsync(id);
        return catImage is not null 
            ? TypedResults.Ok(DTOs.CatImage.ToDTO(catImage)) 
            : TypedResults.NotFound();
    }
}
