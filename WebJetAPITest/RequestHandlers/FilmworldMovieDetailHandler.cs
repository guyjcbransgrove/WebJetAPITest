using MediatR;
using WebJetAPITest.API.Models;
using WebJetAPITest.API.RequestHandlers.HttpClients;

namespace WebJetAPITest.API.RequestHandlers
{
    public class FilmworldMovieDetailHandler : IRequestHandler<FilmworldMovieDetailRequest, MovieDetailResponse>
    {
        private readonly IFilmworldClient _filmworldClient;

        public FilmworldMovieDetailHandler(IFilmworldClient filmworldClient)
        {
            _filmworldClient = filmworldClient;
        }

        public async Task<MovieDetailResponse> Handle(FilmworldMovieDetailRequest request, CancellationToken cancellationToken)
        {
            var response = await _filmworldClient.GetMovieDetailResponse(request.MovieId, cancellationToken);
            return new MovieDetailResponse(Constants.FilmworldProviderId, new MovieDetails(double.Parse(response.Price)));
        }
    }
}
