using MediatR;

namespace WebJetAPITest.API.Models
{
    public record FilmworldMovieListRequest() : IRequest<MovieListResponse>;
    public record FilmworldMovieDetailRequest(string MovieId) : IRequest<MovieDetailResponse>;

    public record CinemaworldMovieListRequest() : IRequest<MovieListResponse>;
    public record CinemaworldMovieDetailRequest(string MovieId) : IRequest<MovieDetailResponse>;

    public record MovieListItem(string? CwMovieId, string? FwMovieId, string Title, string Year, string Type, string PosterURL, string[] ProviderIds);
    public record MovieListResponse(string ProviderId, List<MovieListItem> MovieList);

    public record MovieDetails(double PriceInDollars);
    public record MovieDetailResponse(string ProviderId, MovieDetails MovieDetails);
}
