namespace Back.Application.UseCases;



public interface IUsecase<TRequest, TResponse>
	where TRequest : notnull
	where TResponse : notnull
{
	Task<TResponse> HandleAsync(TRequest request, CancellationToken cancellationToken = default);
}
