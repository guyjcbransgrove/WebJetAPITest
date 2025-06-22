import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import MovieListItem from "./MovieListItem";
import MovieListItemSkeleton from "./MovieListItemSkeleton";
import type { MovieListItemModel, MovieListResponse, ProviderId } from './models';

export interface MovieListProps {
	setSelectedMovieListItem: (id: MovieListItemModel | null) => void,
	loadingList: boolean,
	movieListItems: MovieListItemModel[],
	refreshFailedProvider: (providerId: ProviderId, request: Promise<MovieListResponse>) => void
}

function MovieList(props: MovieListProps) {
	const skeletonCount = 15;
	return (
		<TableContainer component={Paper}>
			<Table aria-label="simple table">
				<TableBody>
					{!props.loadingList && props.movieListItems.map((model) => (
						<MovieListItem 
							key={model.movieId} 
							movieListItemModel={model} 
							setSelectedMovieListItem={props.setSelectedMovieListItem} 
							refreshFailedProvider={props.refreshFailedProvider}
						/>	
					))}
					{props.loadingList && [...Array(skeletonCount).keys()].map((index) => (
						<MovieListItemSkeleton key={index} />
					))}
					
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default MovieList;