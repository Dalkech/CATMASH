namespace Back.Application;

using Back.Application.UseCases.Vote;
using Microsoft.Extensions.DependencyInjection;


public static class ApplicationModule
{
    public static void AddUseCases(this IServiceCollection services)
	{
		services.AddTransient<CreateVoteUseCase>();
	}
}
