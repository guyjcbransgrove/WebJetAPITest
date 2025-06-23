using System.Text.Json;
using WebJetAPITest.API.Models;

namespace WebJetAPITest.API.RequestHandlers.HttpClients
{
    public interface ICinemaworldClient
    {
        Task<CinemaworldMovieListResponse> GetMovieListResponse(CancellationToken cancellationToken);
        Task<CinemaworldMovieDetailResponse> GetMovieDetailResponse(string movieId, CancellationToken cancellationToken);
    }

    public class CinemaworldClient : ICinemaworldClient
    {
        private readonly HttpClient _httpClient;

        // Polly retry has been baked into the typed HttpClient registered in Program.cs
        public CinemaworldClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<CinemaworldMovieListResponse> GetMovieListResponse(CancellationToken cancellationToken)
        {
            var responseJson = await _httpClient.GetStringAsync("movies", cancellationToken);
            return JsonSerializer.Deserialize<CinemaworldMovieListResponse>(responseJson);
        }

        public async Task<CinemaworldMovieDetailResponse> GetMovieDetailResponse(string movieId, CancellationToken cancellationToken)
        {
            var responseJson = await _httpClient.GetStringAsync($"movie/{movieId}", cancellationToken);
            return JsonSerializer.Deserialize<CinemaworldMovieDetailResponse>(responseJson);
        }
    }
}
