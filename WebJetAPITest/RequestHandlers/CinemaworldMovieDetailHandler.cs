using MediatR;
using WebJetAPITest.API.Models;
using WebJetAPITest.API.RequestHandlers.HttpClients;

namespace WebJetAPITest.API.RequestHandlers
{
    public class CinemaworldMovieDetailHandler : IRequestHandler<CinemaworldMovieDetailRequest, MovieDetailResponse>
    {
        private readonly ICinemaworldClient _cinemaworldClient;

        public CinemaworldMovieDetailHandler(ICinemaworldClient cinemaworldClient)
        {
            _cinemaworldClient = cinemaworldClient;
        }

        public async Task<MovieDetailResponse> Handle(CinemaworldMovieDetailRequest request, CancellationToken cancellationToken)
        {
            var response = await _cinemaworldClient.GetMovieDetailResponse(request.MovieId, cancellationToken);
            return new MovieDetailResponse(Constants.CinemaworldProviderId, new MovieDetails(double.Parse(response.Price)));
        }
    }
}
