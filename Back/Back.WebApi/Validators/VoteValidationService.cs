using System;
using Back.Infra.Repository;
using Back.WebApi.Endpoints.Vote;

namespace Back.WebApi.Validators;

public class VoteValidationService
{
	public bool Valid(string winner, string loser)
	{
		if (string.IsNullOrEmpty(winner) || string.IsNullOrEmpty(loser))
		{
			Console.WriteLine("[VoteValidation] Validation failed: Winner or Loser is null or empty.");
			return false;
		}


		if (winner == loser)
		{
			Console.WriteLine("[VoteValidation] Validation failed: Winner and Loser cannot be the same.");
			return false;
		}

		Console.WriteLine("[VoteValidation] Validation succeeded.");
		return true;
	}
}
