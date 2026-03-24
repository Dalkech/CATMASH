using System;

namespace Back.WebApi.CorsPolicies;

internal static class AllowLocalHostPolicy
{
	const string localhostPolicy = "AllowLocalhost";

	internal static void CorsAddLocalHostPolicy(this WebApplicationBuilder builder)
	{
		Console.WriteLine("[CORS] Adding policy to allow localhost origins...");
		builder.Services.AddCors(options =>
			options.AddPolicy(
				name: localhostPolicy,
				policy =>
				{
					policy
						.SetIsOriginAllowed(origin => origin.StartsWith("http://localhost") || origin.StartsWith("https://localhost"))
						.WithHeaders("Content-Type");
				}
		));
	}

	internal static void UseCorsAllowLocalHost(this WebApplication app)
	{
		Console.WriteLine("[CORS] Using policy to allow localhost origins...");
		app.UseCors(localhostPolicy);
	}
}
