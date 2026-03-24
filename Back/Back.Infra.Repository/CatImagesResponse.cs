using Back.Domain;

namespace Back.Infra.Repository;

internal class CatImagesJSONResponse
{
    public List<CatImage> Images { get; set; } = new();
}
