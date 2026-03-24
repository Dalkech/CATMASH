using System;
using Microsoft.AspNetCore.Http.HttpResults;
using Back.WebApi.Validators;
using Back.WebApi.DTOs;
using Back.Application.UseCases;
using Back.Application.UseCases.Vote;
using Back.Infra.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using static System.Net.WebRequestMethods;

namespace Back.WebApi.Endpoints.Vote;

public static class VoteEndpoints
{
	public static void MapVoteEndpoints(this WebApplication app)
    {
        RouteGroupBuilder group = app.MapGroup("/vote")
            .WithName("Vote");

        group.MapPost("", CreateVote).WithName("Creating Vote");
    }

	private static async Task<Results<Ok<VotePostResponse>, BadRequest<string>>> CreateVote(
		VotePostInput input, 
		HttpContext context,
		VoteValidationService voteValidationService,
		ICatImageRepository catImageRepository,
		CreateVoteUseCase usecase)
	{
		System.Console.WriteLine($"[Vote] new vote with winner: {input.Winner} looser: {input.Loser}");
		if(!voteValidationService.Valid(input.Winner, input.Loser))
			return TypedResults.BadRequest("Invalid vote input. Please ensure that winner and loser are valid cat IDs and not the same.");

		CreateVoteRequest request = new CreateVoteRequest(input.Winner, input.Loser);
		CreateVoteResponse response = await usecase.HandleAsync(request);

		if(response.error != string.Empty )
			return TypedResults.BadRequest(response.error);

		return TypedResults.Ok(new VotePostResponse(){ 
			WinnerScore = response.WinnerScore, 
			LoserScore = response.LoserScore
		});
	}
}
