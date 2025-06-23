using MediatR;
using WebJetAPITest.API.Models;
using WebJetAPITest.API.RequestHandlers.HttpClients;

namespace WebJetAPITest.API.RequestHandlers
{
    public class FilmworldMovieListHandler : IRequestHandler<FilmworldMovieListRequest, MovieListResponse>
    {
        private readonly IFilmworldClient _filmworldClient;

        public FilmworldMovieListHandler(IFilmworldClient filmworldClient)
        {
            _filmworldClient = filmworldClient;
        }

        public async Task<MovieListResponse> Handle(FilmworldMovieListRequest request, CancellationToken cancellationToken)
        {
            var response = await _filmworldClient.GetMovieListResponse(cancellationToken);
            return new MovieListResponse(
                Constants.FilmworldProviderId, 
                response.Movies.Select(x => 
                    new MovieListItem(
                        CwMovieId: null, 
                        FwMovieId: x.ID, 
                        x.Title, 
                        x.Year, 
                        x.Type, 
                        x.Poster, 
                        [Constants.FilmworldProviderId]
                    )).ToList()
            );
        }
    }
}
