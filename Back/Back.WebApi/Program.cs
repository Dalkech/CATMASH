using Back.Infra.Repository;
using Back.WebApi.Endpoints.CatImage;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

Console.WriteLine("Configuring services...");

// Register CatMashDBContext 
CatMashDbServiceRegistration.AddDbContext(builder, "CatMashDb");


builder.Services.AddDatabaseDeveloperPageExceptionFilter();

#region Swagger / OpenAPI configuration
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "CatMashAPI";
    config.Title = "CatMashAPI v1";
    config.Version = "v1";
});

#endregion

var app = builder.Build();

// set DbContext and seed data
await CatMashDbServiceRegistration.SetDbContextAsync(app);


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

app.MapGet("/", () => "Hello World!");

// Map CatImage endpoints
app.MapCatImageEndpoints();

app.Run();

/// <summary>
/// exposed for integration testing purposes
/// </summary>
public partial class Program {}