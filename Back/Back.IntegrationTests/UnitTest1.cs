using Microsoft.AspNetCore.Mvc.Testing;
using Back.Infra.Repository;
using System.Net.Http.Json;

namespace Back.IntegrationTests
{
    public class CatImageEndpointTest : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _factory;

        public CatImageEndpointTest(WebApplicationFactory<Program> factory)
        {
            _factory = factory;
        }

        [Fact]
        public async Task Get_Endpoint_ReturnsSuccess()
        {
            var client = _factory.CreateClient();
            var response = await client.GetAsync("/catimages");

            response.EnsureSuccessStatusCode();
            var catImages = await response.Content.ReadFromJsonAsync<List<CatImage>>();
            Assert.NotNull(catImages);
            Assert.NotEmpty(catImages);
            Assert.All(catImages, item => 
                Assert.False(
                    string.IsNullOrEmpty(item.Url) && string.IsNullOrEmpty(item.Id)));         }
    }
}
