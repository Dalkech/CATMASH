namespace Back.Domain;

public class CatImage
{
	public required string Id  {get; set;}
	public required string Url { get; set; }
	public int? Score { get; set; }
	public int? WinCount { get; set; }
	public int? LooseCount { get; set; }
}
