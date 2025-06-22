import { Container, Snackbar } from "@mui/material";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import { useEffect, useState } from "react";
import type { MovieListItemModel, MovieListResponse, ProviderId, ProviderRequest } from "./models";
import { mergeList } from "./utils";
import { ProviderStateContext } from "./contexts";
import { FAKE_fetchCinemaworldList, FAKE_fetchFilmworldList } from "./api";
import { useProviderRequest } from "./hooks";

function MovieContent() {
	// request promise as state for incremental loading
	const cinemaworldRequest = useProviderRequest("Cinemaworld", FAKE_fetchCinemaworldList());
	const filmworldRequest = useProviderRequest("Filmworld", FAKE_fetchFilmworldList());
	const allProviderRequests = [cinemaworldRequest, filmworldRequest];
	const [unresolvedProviderRequests, setUnresolvedProviderRequests] = useState<ProviderRequest<MovieListResponse>[]>(allProviderRequests);

	// movie list as state
	const [movieList, setMovieList] = useState<MovieListItemModel[]>([]);
	const [selectedMovieListItem, setSelectedMovieListItem] = useState<MovieListItemModel | null>(null);

	// derived state (handled outside of tsx for readability)
	const loadingList = !allProviderRequests.some(x => x.providerState === "loaded");
	const erroredProvider = allProviderRequests.find(x => x.providerState === "errored");
	const allProvidersErrored = allProviderRequests.every(x => x.providerState === "errored");

	// if a provider ever completely fails we set a new request, set it back to "loading" and put it back into unresolved state
	const refreshFailedProvider = (providerId: ProviderId, request: Promise<MovieListResponse>) => {
		const providerRequest = allProviderRequests.find(x => x.providerId === providerId);
		if (!providerRequest) return;
		providerRequest.request = request;
		providerRequest.setProviderState("loading");
		setUnresolvedProviderRequests([providerRequest]);
	};

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