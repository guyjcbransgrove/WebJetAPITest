import { Container } from "@mui/material";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import { useEffect, useState } from "react";
import type { MovieListItemModel } from "./models";
import { mergeList } from "./utils";

const provider1 = new Promise<MovieListItemModel[]>((resolve) => {
	setTimeout(() => {
		resolve([
			{ movieId: "test1", title: "test1", releaseYear: 2001, providerIds: ["1"] },
			{ movieId: "test2", title: "test2", releaseYear: 2002, providerIds: ["1"] },
			{ movieId: "test3", title: "test3", releaseYear: 2003, providerIds: ["1"] },
			{ movieId: "test4", title: "test4", releaseYear: 2004, providerIds: ["1"] },
			{ movieId: "test5", title: "test5", releaseYear: 2005, providerIds: ["1"] },
		])
	}, 20000)
});
const provider2 = new Promise<MovieListItemModel[]>((resolve) => {
	setTimeout(() => {
		resolve([
			{ movieId: "test4", title: "test4", releaseYear: 2004, providerIds: ["2"] },
			{ movieId: "test5", title: "test5", releaseYear: 2005, providerIds: ["2"] },
			{ movieId: "test6", title: "test6", releaseYear: 2006, providerIds: ["2"] },
			{ movieId: "test7", title: "test7", releaseYear: 2007, providerIds: ["2"] },
			{ movieId: "test8", title: "test8", releaseYear: 2008, providerIds: ["2"] },
		])
	}, 10000)
});

function MovieContent() {
	const [providerResponses, setProviderResponses] = useState<Promise<MovieListItemModel[]>[]>([provider1, provider2]);
	const [movieDetailsId, setMovieDetailsId] = useState<string | null>(null);
	const [movieList, setMovieList] = useState<MovieListItemModel[]>([]);
	const [loadingList, setLoadingList] = useState(true);

	// derived state
	const areDetailsOpen = movieDetailsId !== null;

	useEffect(() => {
		const fetchMovieList = async () => {
			const firstResolved = Promise.any(providerResponses);
			try {
				const movies = await firstResolved;
				setLoadingList(false);
				setMovieList(mergeList(movieList, movies));
			}
			finally {
				setProviderResponses(providerResponses.filter(x => x != firstResolved));
			}
		};
		fetchMovieList();
	});
	
	return (
		<Container>
			<MovieList setMovieDetailsId={setMovieDetailsId} loadingList={loadingList} movieList={movieList} />
			<MovieDetails detailsOpen={areDetailsOpen} closeMovieDetails={() => setMovieDetailsId(null)} />
		</Container>
	)
}

export default MovieContent;