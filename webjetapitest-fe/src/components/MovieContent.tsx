import { Container } from "@mui/material";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import { useEffect, useState } from "react";
import type { MovieListItemModel, MovieListResponse, ProviderState } from "./models";
import { mergeList } from "./utils";
import { ProviderStateContext } from "./contexts";

interface ProviderListRequest {
	providerId: string,
	request: Promise<MovieListResponse>,
	providerState: ProviderState,
	setProviderState: React.Dispatch<React.SetStateAction<ProviderState>>
}

const FAKE_fetchCinemaworld = new Promise<MovieListResponse>((resolve) => {
	setTimeout(() => {
		resolve(
			{
				providerId: "Cinemaworld", 
				movieList: [
					{ movieId: "test1", title: "test1", releaseYear: 2001, providerIds: ["Cinemaworld"] },
					{ movieId: "test2", title: "test2", releaseYear: 2002, providerIds: ["Cinemaworld"] },
					{ movieId: "test3", title: "test3", releaseYear: 2003, providerIds: ["Cinemaworld"] },
					{ movieId: "test4", title: "test4", releaseYear: 2004, providerIds: ["Cinemaworld"] },
					{ movieId: "test5", title: "test5", releaseYear: 2005, providerIds: ["Cinemaworld"] },
				]
			}
		)
	}, 2000)
});

const FAKE_fetchFilmworld = new Promise<MovieListResponse>((resolve) => {
	setTimeout(() => {
		resolve(
			{
				providerId: "Filmworld", 
				movieList: [
					{ movieId: "test4", title: "test4", releaseYear: 2004, providerIds: ["Filmworld"] },
					{ movieId: "test5", title: "test5", releaseYear: 2005, providerIds: ["Filmworld"] },
					{ movieId: "test6", title: "test6", releaseYear: 2006, providerIds: ["Filmworld"] },
					{ movieId: "test7", title: "test7", releaseYear: 2007, providerIds: ["Filmworld"] },
					{ movieId: "test8", title: "test8", releaseYear: 2008, providerIds: ["Filmworld"] },
				]
			}
		)
	}, 1000)
});

function useProviderRequest(providerId: string, request: Promise<MovieListResponse>): ProviderListRequest {
	const [providerState, setProviderState] = useState<ProviderState>("loading");
	return {
		providerId,
		request,
		providerState,
		setProviderState
	}
}

function MovieContent() {
	// request promise as state for incremental loading
	const cinemaworldRequest = useProviderRequest("Cinemaworld", FAKE_fetchCinemaworld);
	const filmworldRequest = useProviderRequest("Filmworld", FAKE_fetchFilmworld);
	const [unresolvedProviderRequests, setUnresolvedProviderRequests] = useState<ProviderListRequest[]>([cinemaworldRequest, filmworldRequest]);

	// movie list as state
	const [movieList, setMovieList] = useState<MovieListItemModel[]>([]);
	const [selectedMovieListItem, setSelectedMovieListItem] = useState<MovieListItemModel | null>(null);

	// derived state (handled outside of tsx for readability)
	const loadingList = cinemaworldRequest.providerState != "loaded" && filmworldRequest.providerState != "loaded";

	useEffect(() => {
		const fetchMovieList = async () => {
			const firstResolved = Promise.any(unresolvedProviderRequests.map(x => x.request));
			try {
				const response = await firstResolved;
				const providerRequest = unresolvedProviderRequests.find(x => x.providerId === response.providerId);
				providerRequest?.setProviderState("loaded");
				setUnresolvedProviderRequests(unresolvedProviderRequests.filter(x => x.providerId !== response.providerId))
				setMovieList(mergeList(movieList, response.movieList));
			}
			catch(ex) {
				if (ex instanceof AggregateError && unresolvedProviderRequests.length > 0) {
					// Promise.any() will only return an AggregateError if all promises are rejected so this is safe to do
					unresolvedProviderRequests.forEach(x => x.setProviderState("errored"));
					setUnresolvedProviderRequests([]);
				}
			}
		};
		fetchMovieList();
	});
	
	return (
		<Container>
			<ProviderStateContext value={{cinemaworldStatus: cinemaworldRequest.providerState, filmworldStatus: filmworldRequest.providerState}}>
				<MovieList 
					movieListItems={movieList} 
					setSelectedMovieListItem={setSelectedMovieListItem} 
					loadingList={loadingList}
				/>
			</ProviderStateContext>
			<MovieDetails 
				selectedMovieListItem={selectedMovieListItem} 
				closeMovieDetails={() => setSelectedMovieListItem(null)} 
			/>
		</Container>
	)
}

export default MovieContent;