using Back.Domain;
using Xunit;

public class ScoreServiceTests
{
    [Fact]
    public void CalculateNewScores_BothNewPlayers_SetsInitialRatingAndUpdatesCounts()
    {
        var winner = new CatImage { Id = "mock1", Url = "", Score = null, WinCount = null };
        var loser = new CatImage { Id = "mock2", Url = "", Score = null, LooseCount = null };

        ScoreService.CalculateNewScores(winner, loser);

        Assert.True(ScoreService._starting_Rate < winner.Score); 
        Assert.True(winner.Score > loser.Score);
        Assert.Equal(1, winner.WinCount);
        Assert.Equal(1, loser.LooseCount);
    }

    [Fact]
    public void CalculateNewScores_WinnerHigherRated_WinsLessPoints()
    {
		int winnerOldRating = 1600;
		int loserOldRating = 1400; 
        
		var winner = new CatImage { Id="mock1HigherRated", Url="", Score = winnerOldRating, WinCount = 0 };
        var loser = new CatImage { Id="mock2", Url="", Score = loserOldRating, LooseCount = 0 };
        ScoreService.CalculateNewScores(winner, loser);
		var winnerWithHigherRateGain = winner.Score - winnerOldRating;

		winnerOldRating = 1400;
		loserOldRating = 1600;
		winner = new CatImage { Id="mock1HigherRated", Url="", Score = winnerOldRating, WinCount = 0 };
        loser = new CatImage { Id="mock2", Url="", Score = loserOldRating, LooseCount = 0 };
        ScoreService.CalculateNewScores(winner, loser);
		var winnerWithLowerRateGain = winner.Score - winnerOldRating;


		Assert.True(winnerWithLowerRateGain > winnerWithHigherRateGain);
    }

    [Fact]
    public void CalculateNewScores_UnderdogWins_GainsMorePoints()
    {
		int winnerOldRating = 1400;
		int loserOldRating = 1600; 
        var winner = new CatImage { Id="mock", Url="", Score = winnerOldRating, WinCount = 0 };
        var loser = new CatImage { Id="mock2HigherRated", Url="",  Score = loserOldRating, LooseCount = 0 };

        ScoreService.CalculateNewScores(winner, loser);

		Assert.True((winner.Score - winnerOldRating) > (loserOldRating - loser.Score));
    }

    [Fact]
    public void CalculateNewScores_SameRating_WinnerGainsExactlyKFactorHalf()
    {
        var winner = new CatImage {  Id="mockWithSameRate", Url="", Score = 1500, WinCount = 0 };
        var loser = new CatImage { Id="mockWithSameRate", Url="", Score = 1500, LooseCount = 0 };

        ScoreService.CalculateNewScores(winner, loser);

        Assert.Equal(1510, winner.Score); // (K=20) * (1 - 0.5) = +10
        Assert.Equal(1490, loser.Score); // -10
    }
}