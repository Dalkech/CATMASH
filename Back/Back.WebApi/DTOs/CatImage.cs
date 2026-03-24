using System.Collections.Generic;
using Back.Infra.Repository;
namespace Back.WebApi.DTOs;

public class CatImage()
{

    public string Id { get; set; }
    public string Url { get; set; }
    public int? Score { get; set; }

    public static CatImage ToDTO(Infra.Repository.CatImage catImage)
    {
        return new CatImage
        {
            Id = catImage.Id,
            Url = catImage.Url,
            Score = catImage.Score
        };
    }
    static public List<CatImage> ToDTOFromList(List<Infra.Repository.CatImage> catImages)
    {
        if (catImages.Count == 0)
        {
            return [];
        }

        return [.. catImages.Select(ToDTO)];
    }
}
