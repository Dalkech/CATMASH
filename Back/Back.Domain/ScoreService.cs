namespace Back.Domain;

public static class ScoreService
{

	private const int 
		CALIBRATION_FACTOR = 100,
		K_FACTOR = 20,
		WIN_RESULT = 1, 
		LOOSE_RESULT = 0
	; 
	/// <summary>1500</summary>
	public const int _starting_Rate = 1500;

/// <summary>
/// Calculate and updates scores according to Elo System.
/// Set the base score to <inheritdoc cref="_starting_Rate"/>
/// </summary>
/// <param name="winner"></param>
/// <param name="loser"></param>
	public static void CalculateNewScores(CatImage winner, CatImage loser)
	{
		int ratingA = winner.Score?? _starting_Rate;
		int ratingB = loser.Score?? _starting_Rate;

		double expectedA = 1 / (1 + Math.Pow(10, (ratingB - ratingA) / CALIBRATION_FACTOR));
        double expectedB = 1 - expectedA;

		int resultA = WIN_RESULT;
        winner.Score = (int)Math.Ceiling(ratingA + K_FACTOR * (resultA - expectedA));
		winner.WinCount = winner.WinCount ?? 0;
		winner.WinCount++;

        loser.Score = (int)Math.Ceiling(ratingB + K_FACTOR * ((1 - resultA) - expectedB));
		loser.LooseCount = loser.LooseCount ?? 0;
		loser.LooseCount++;
	} 
}
