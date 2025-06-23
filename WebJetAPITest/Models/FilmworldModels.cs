namespace WebJetAPITest.API.Models
{
    public record FilmWorldMovieItem(string Title, string Year, string ID, string Type, string Poster);

    public record FilmworldMovieListResponse(List<FilmWorldMovieItem> Movies);

    public record FilmworldMovieDetailResponse(
        string Title,
        string Year,
        string Rated,
        string Released,
        string Runtime,
        string Genre,
        string Director,
        string Writer,
        string Actors,
        string Plot,
        string Language,
        string Country,
        string Poster,
        string Metascore,
        string Rating,
        string Votes,
        string ID,
        string Typestring,
        string Price
    );
}
