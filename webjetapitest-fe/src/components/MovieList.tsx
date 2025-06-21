import { Paper, Table, TableBody, TableContainer } from "@mui/material";
import MovieListItem from "./MovieListItem";
import MovieListItemSkeleton from "./MovieListItemSkeleton";
import type { MovieListItemModel } from './models';

export interface MovieListProps {
	setMovieDetailsId: (id: string | null) => void,
	loadingList: boolean,
	movieList: MovieListItemModel[]
}

function MovieList(props: MovieListProps) {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="simple table">
				<TableBody>
					{!props.loadingList && props.movieList.map((model) => (
						<MovieListItem key={model.movieId} movieListItemModel={model} setMovieDetailsId={props.setMovieDetailsId} />	
					))}
					{props.loadingList && [...Array(10).keys()].map((index) => (
						<MovieListItemSkeleton key={index} />
					))}
					
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default MovieList;