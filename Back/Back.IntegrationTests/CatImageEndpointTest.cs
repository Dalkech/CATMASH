using Back.WebApi.DTOs;
using Microsoft.AspNetCore.Mvc.Testing;
using System.Net.Http.Json;
using Back.Infra.Repository;
using System.Net;
using Microsoft.Extensions.DependencyInjection;

namespace Back.IntegrationTests
{
    public class CatImageEndpointTest : IClassFixture<CustomWebApplicationFactory<Program>>
    {
        private readonly CustomWebApplicationFactory<Program> _factory;
        private readonly HttpClient _client;

        public CatImageEndpointTest(CustomWebApplicationFactory<Program> factory)
        {
            _factory = factory;
            _client = _factory.CreateClient();
        }

        private async Task MockDataAsync()
        {
            using var scope = _factory.Services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<CatMashDBContext>();
            db.Database.EnsureDeleted(); // Ensure clean state
            db.CatImages.AddRange(
                new Domain.CatImage { Id = "aca", Url = "https://example.com/aca.jpg" },
                new Domain.CatImage { Id = "xyz", Url = "https://example.com/xyz.jpg" }
            );
            await db.SaveChangesAsync();
        }

        private async Task ClearDataAsync()
        {
            using var scope = _factory.Services.CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<CatMashDBContext>();
            db.Database.EnsureDeleted();
            await db.SaveChangesAsync();
        }

        [Fact]
        public async Task Get_CatImages_ReturnsSuccess()
        {
            await MockDataAsync(); // Seed the in-memory database with test data
            
            var response = await _client.GetAsync("/catimages");
            response.EnsureSuccessStatusCode();
            var catImages = await response.Content.ReadFromJsonAsync<List<WebApi.DTOs.CatImage>>();

            Assert.NotNull(catImages);
            Assert.NotEmpty(catImages);
            Assert.All(catImages, item =>
                Assert.False(string.IsNullOrEmpty(item.Url) && string.IsNullOrEmpty(item.Id)));
        }

        [Fact]
        public async Task Get_CatImages_ReturnsEmptyList()
        {
            await ClearDataAsync();

            var response = await _client.GetAsync("/catimages");
            response.EnsureSuccessStatusCode();
            var catImages = await response.Content.ReadFromJsonAsync<List<WebApi.DTOs.CatImage>>();

            Assert.NotNull(catImages);
            Assert.True(catImages.Count == 0, "Expected an empty list of cat images when database is empty.");
        }

        [Fact]
        public async Task Get_CatImageById_ReturnsSuccess()
        {
            await MockDataAsync(); // Seed the in-memory database with test data
            
            var response = await _client.GetAsync("/catimages/aca");
            response.EnsureSuccessStatusCode();
            var catImage = await response.Content.ReadFromJsonAsync<WebApi.DTOs.CatImage>();
            
            Assert.NotNull(catImage);
            Assert.Equal("aca", catImage.Id);
            Assert.False(string.IsNullOrEmpty(catImage.Url));
        }

        [Fact]
        public async Task Get_CatImageById_NotFound()
        {
            await MockDataAsync();

            var response = await _client.GetAsync("/catimages/nonexistent");
            
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        }
    }
}