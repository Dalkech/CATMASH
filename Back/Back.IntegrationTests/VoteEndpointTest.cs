using System.Net.Http.Json;
using Back.Infra.Repository;
using Back.WebApi.DTOs;
using Microsoft.Extensions.DependencyInjection;
using System.Net;
namespace Back.IntegrationTests;

public class VoteEndpointTest : IClassFixture<CustomWebApplicationFactory<Program>>
{
	private readonly HttpClient _client;

	public VoteEndpointTest(CustomWebApplicationFactory<Program> factory)
	{
		_client = factory.CreateClient();
	}


	[Fact]
	public async Task Post_Vote_ReturnsBadResult_EqualsWinnerAndLooser()
	{
		VotePostInput incorrectPost = new(){ Winner = "sameId", Loser="sameId"};
		
		var response = await _client.PostAsJsonAsync<VotePostInput>("/vote", incorrectPost);
		
		Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
	}

	[Fact]
	public async Task Post_Vote_ReturnsBadResult_Inexistent()
	{
		VotePostInput incorrectPost = new(){ Winner = "incorrectId", Loser="sameId"};
		
		var response = await _client.PostAsJsonAsync<VotePostInput>("/vote", incorrectPost);

		Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
	}

	[Fact]
	public async Task Post_Vote_ReturnsSuccess()
	{
		/*
		new Back.Domain.CatImage { Id = "azo", Url = "https://example.com/aca.jpg", Score = 1600 },
		...,
		new Back.Domain.CatImage { Id = "666", Url = "https://example.com/xyz.jpg" }
		*/
		VotePostInput correctPost = new(){ Winner = "666", Loser="azo"};

		var response = await _client.PostAsJsonAsync<VotePostInput>("/vote", correctPost);
		response.EnsureSuccessStatusCode();
		var postResponse  = await response.Content.ReadFromJsonAsync<WebApi.DTOs.VotePostResponse>();
		

		Assert.NotNull(postResponse);
		Assert.True(
			postResponse.WinnerScore > 0 
			&& postResponse.LoserScore > 0);

		Assert.True(postResponse.WinnerScore > Domain.ScoreService._starting_Rate);
		Assert.True(postResponse.LoserScore < 1600);
	}
}
