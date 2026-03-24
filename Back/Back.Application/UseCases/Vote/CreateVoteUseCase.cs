using Back.Domain;
using Back.Infra.Repository;

namespace Back.Application.UseCases.Vote;

public record CreateVoteResponse(int WinnerScore, int LoserScore, string error);

public record CreateVoteRequest(string WinnerId, string LooserId);

public sealed class CreateVoteUseCase(ICatImageRepository catImageRepository): IUsecase<CreateVoteRequest, CreateVoteResponse>
{
	private readonly ICatImageRepository _catImageRepository = catImageRepository;
	public async Task<CreateVoteResponse> HandleAsync(CreateVoteRequest request, CancellationToken cancellationToken = default)
	{
		
		var errorResult = new CreateVoteResponse(0,0,"Invalid vote input. Please ensure that winner and loser exist and are not the same.");		
		bool exist = await _catImageRepository.IdsExistAsync([request.WinnerId, request.LooserId]);
		
		if(!exist || request.WinnerId == request.LooserId)
			return errorResult;

		CatImage? winner = await _catImageRepository.GetByIdAsync(request.WinnerId);
		CatImage? looser = await _catImageRepository.GetByIdAsync(request.LooserId);
		
		if(winner != null && looser != null) 
		{
			ScoreService.CalculateNewScores(winner, looser);
		
			await _catImageRepository.UpdateAsync(winner);
			await _catImageRepository.UpdateAsync(looser);
			await _catImageRepository.SaveChangesAsync();
			
			return new CreateVoteResponse(winner.Score.GetValueOrDefault(), looser.Score.GetValueOrDefault(), string.Empty);
		}

		return errorResult;
	}
}
