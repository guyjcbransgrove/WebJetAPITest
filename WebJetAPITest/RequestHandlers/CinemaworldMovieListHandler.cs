using MediatR;
using WebJetAPITest.API.Models;
using WebJetAPITest.API.RequestHandlers.HttpClients;

namespace WebJetAPITest.API.RequestHandlers
{
    public class CinemaworldMovieListHandler : IRequestHandler<CinemaworldMovieListRequest, MovieListResponse>
    {
        private readonly ICinemaworldClient _cinemaworldClient;

        public CinemaworldMovieListHandler(ICinemaworldClient cinemaworldClient)
        {
            _cinemaworldClient = cinemaworldClient;
        }

        public async Task<MovieListResponse> Handle(CinemaworldMovieListRequest request, CancellationToken cancellationToken)
        {
            var response = await _cinemaworldClient.GetMovieListResponse(cancellationToken);
            return new MovieListResponse(
                Constants.CinemaworldProviderId, 
                response.Movies.Select(x => 
                    new MovieListItem(
                        CwMovieId: x.ID, 
                        FwMovieId: null, 
                        x.Title, 
                        x.Year, 
                        x.Type, 
                        x.Poster, 
                        [Constants.CinemaworldProviderId]
                        )
                    ).ToList());
        }
    }
}
