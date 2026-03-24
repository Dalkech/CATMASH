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
        var winner = new CatImage { Id="mock1HigherRated", Url="", Score = 1600, WinCount = 0 };
        var loser = new CatImage { Id="mock2", Url="", Score = 1400, LooseCount = 0 };

        ScoreService.CalculateNewScores(winner, loser);

        Assert.True(winner.Score < 1620); // K=20, but expected win high → small gain
        Assert.True(loser.Score < 1400);  // Should lose points
    }

    [Fact]
    public void CalculateNewScores_UnderdogWins_GainsMorePoints()
    {
        var winner = new CatImage { Id="mock", Url="", Score = 1400, WinCount = 0 };
        var loser = new CatImage { Id="mock2HigherRated", Url="",  Score = 1600, LooseCount = 0 };

        ScoreService.CalculateNewScores(winner, loser);

        Assert.True(winner.Score > 1410); // Bigger gain due to surprise win
        Assert.True(loser.Score < 1600);
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