using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using WebJetAPITest.API.Models;
using WebJetAPITest.API.RequestHandlers;

namespace WebJetAPITest.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MovieController : ControllerBase
    {
        private readonly IMediator _mediatr;

        public MovieController(
            IMediator mediatr
            )
        {
            _mediatr = mediatr;
        }

        [HttpGet("list/{providerId}")]
        public async Task<IActionResult> GetMoviesList(string providerId, CancellationToken cancellationToken)
        {
            var response = providerId switch
            {
                Constants.FilmworldProviderId => await _mediatr.Send(new FilmworldMovieListRequest(), cancellationToken),
                Constants.CinemaworldProviderId => await _mediatr.Send(new CinemaworldMovieListRequest(), cancellationToken),
                _ => throw new Exception()
            };
            return Ok(response);
        }

        [HttpGet("{providerId}/{movieId}")]
        public async Task<IActionResult> GetMovie(string providerId, string movieId, CancellationToken cancellationToken) 
        {
            var response = providerId switch
            {
                Constants.FilmworldProviderId => await _mediatr.Send(new FilmworldMovieDetailRequest(movieId), cancellationToken),
                Constants.CinemaworldProviderId => await _mediatr.Send(new CinemaworldMovieDetailRequest(movieId), cancellationToken),
                _ => throw new Exception()
            };

            return Ok(response);
        }

    }
}
