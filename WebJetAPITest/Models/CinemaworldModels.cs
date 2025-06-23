namespace WebJetAPITest.API.Models
{
    public record CinemaWorldMovieItem(string Title, string Year, string ID, string Type, string Poster);

    public record CinemaworldMovieListResponse(List<CinemaWorldMovieItem> Movies);

    public record CinemaworldMovieDetailResponse(
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
        string Awards, 
        string Poster, 
        string Metascore, 
        string Rating, 
        string Votes, 
        string ID, 
        string Typestring, 
        string Price
    );
}
