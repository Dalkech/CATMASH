namespace Back.Infra.Repository;

public class CatImage
{
    public required string Id { get; set; }
    public string Url { get; set; } = "https://preview.redd.it/i-miss-my-cat-v0-0z0gtjofuepd1.jpeg?width=1080&crop=smart&auto=webp&s=a773fbb09f9a43455780634788ce9c07a018d604";
    public int? Score { get; set; } = null;
}
