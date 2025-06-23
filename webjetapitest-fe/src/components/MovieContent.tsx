import { Container, Snackbar } from "@mui/material";
import MovieList from "./MovieList/MovieList";
import MovieDetails from "./MovieDetails/MovieDetails";
import { useEffect, useState } from "react";
import type { MovieListItemModel, MovieListResponse, ProviderId, ProviderRequest } from "../tools/models";
import { mergeList } from "../tools/utils";
import { ProviderStateContext } from "../tools/contexts";
import { fetchCinemaworldList, fetchFilmworldList } from "../tools/api";
import { useProviderRequest } from "../tools/hooks";

function MovieContent() {
	// request promise as state for incremental loading
	const cinemaworldRequest = useProviderRequest("Cinemaworld", fetchCinemaworldList);
	const filmworldRequest = useProviderRequest("Filmworld", fetchFilmworldList);
	const allProviderRequests = [cinemaworldRequest, filmworldRequest];
	const [unresolvedProviderRequests, setUnresolvedProviderRequests] = useState<ProviderRequest<MovieListResponse>[]>(allProviderRequests);

	// movie list as state
	const [movieList, setMovieList] = useState<MovieListItemModel[]>([]);
	const [selectedMovieListItem, setSelectedMovieListItem] = useState<MovieListItemModel | null>(null);

	// derived state (handled outside of tsx for readability)
	const loadingList = !allProviderRequests.some(x => x.providerState === "loaded");
	const erroredProvider = allProviderRequests.find(x => x.providerState === "errored");
	const allProvidersErrored = allProviderRequests.every(x => x.providerState === "errored");

	// if a provider ever completely fails the user can set it back to "loading" and put it back into unresolved state
	const refreshFailedProvider = (providerId: ProviderId) => {
		const providerRequest = allProviderRequests.find(x => x.providerId === providerId);
		if (!providerRequest) return;
		providerRequest.setProviderState("loading");
		setUnresolvedProviderRequests([providerRequest]);
	};

	useEffect(() => {
		const fetchMovieList = async () => {
			
			const firstResolved = Promise.any(unresolvedProviderRequests.map(x => x.request()));
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
	}, [unresolvedProviderRequests]);
	
	return (
		<Container>
			<ProviderStateContext value={{cinemaworldStatus: cinemaworldRequest.providerState, filmworldStatus: filmworldRequest.providerState}}>
				<MovieList 
					movieListItems={movieList} 
					setSelectedMovieListItem={setSelectedMovieListItem} 
					loadingList={loadingList}
					refreshFailedProvider={refreshFailedProvider}
				/>
			</ProviderStateContext>
			{selectedMovieListItem !== null && 
				<MovieDetails 
					selectedMovieListItem={selectedMovieListItem} 
					closeMovieDetails={() => setSelectedMovieListItem(null)} 
				/>
			}
			<Snackbar 
				open={erroredProvider !== undefined && !allProvidersErrored}
				message="A provider has errored. Click on the ! icon to re-attempt it."
			/>
			<Snackbar 
				open={allProvidersErrored}
				message="All providers have errored. Please refresh the page."
			/>
		</Container>
	)
}

export default MovieContent;