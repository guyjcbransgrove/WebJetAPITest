using System.Text.Json;
using WebJetAPITest.API.Models;

namespace WebJetAPITest.API.RequestHandlers.HttpClients
{
    public interface IFilmworldClient
    {
        Task<FilmworldMovieListResponse> GetMovieListResponse(CancellationToken cancellationToken);
        Task<FilmworldMovieDetailResponse> GetMovieDetailResponse(string movieId, CancellationToken cancellationToken);
    }

    public class FilmworldClient : IFilmworldClient
    {
        private readonly HttpClient _httpClient;

        // Polly retry has been baked into the typed HttpClient registered in Program.cs
        public FilmworldClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<FilmworldMovieListResponse> GetMovieListResponse(CancellationToken cancellationToken)
        {
            var responseJson = await _httpClient.GetStringAsync("movies", cancellationToken);
            return JsonSerializer.Deserialize<FilmworldMovieListResponse>(responseJson);
        }

        public async Task<FilmworldMovieDetailResponse> GetMovieDetailResponse(string movieId, CancellationToken cancellationToken)
        {
            var responseJson = await _httpClient.GetStringAsync($"movie/{movieId}", cancellationToken);
            return JsonSerializer.Deserialize<FilmworldMovieDetailResponse>(responseJson);
        }
    }
}
