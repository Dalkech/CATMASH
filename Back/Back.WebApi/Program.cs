using Back.Infra.Repository;
using Back.WebApi.Endpoints.CatImage;
using Back.WebApi.CorsPolicies;
using Back.WebApi.Validators;
using Back.WebApi.Endpoints.Vote;
using Back.Application;

var builder = WebApplication.CreateBuilder(args);

Console.WriteLine("Configuring services...");

builder.CorsAddLocalHostPolicy();

// Register CatMashDBContext 
CatMashDbServiceRegistration.AddDbContext(builder.Services, "CatMashDb");

if(builder.Environment.IsDevelopment())
{
	Console.WriteLine("Adding database developer page exception filter for development environment...");
	builder.Services.AddDatabaseDeveloperPageExceptionFilter();
}

#region Swagger / OpenAPI configuration
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "CatMashAPI";
    config.Title = "CatMashAPI v1";
    config.Version = "v1";
});

#endregion

Console.WriteLine("[Validators] Registering VoteValidationService...");
builder.Services.AddTransient<VoteValidationService>();

Console.WriteLine("[Application] adding UseCase");
builder.Services.AddUseCases();

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.IncludeFields = true;
});

WebApplication app = builder.Build();


// In Program.cs or startup logic
if (!app.Environment.IsEnvironment("Testing"))
{
// set DbContext and seed data
await CatMashDbServiceRegistration.SetDbContextAsync(app);
}
app.UseOpenApi();

if (app.Environment.IsDevelopment())
{
    app.UseSwaggerUi(config =>
    {
        config.DocumentTitle = "CatMashAPI";
        config.Path = "/swagger";
        config.DocumentPath = "/swagger/{documentName}/swagger.json";
        config.DocExpansion = "list";
    });
}

app.MapGet("/", () =>  Results.Content($$"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>CATMASH API Documentation</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
        a { font-size: 1.2em; color: #007BFF; text-decoration: none; }
        a:hover { text-decoration: underline; }
      </style>
    </head>
    <body>
      <h1>CATMASH API</h1>
      <p><a href="/swagger" target="_blank">Open Swagger Documentation</a></p>
    </body>
    </html>
    """, "text/html"));   
// Map CatImage endpoints
app.MapCatImageEndpoints();
app.MapVoteEndpoints();
if(app.Environment.IsDevelopment())
{
    app.UseCorsAllowLocalHost();
}
app.Run();

/// <summary>
/// exposed for integration testing purposes
/// </summary>
public partial class Program {}