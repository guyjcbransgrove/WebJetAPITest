import { IconButton, TableCell, TableRow } from "@mui/material";
import MovieIcon from '@mui/icons-material/Movie';
import PublicIcon from '@mui/icons-material/Public';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import type { ReactNode } from "react";
import type { MovieListItemModel } from "./models";

export interface MovieListItemProps {
	setMovieDetailsId: (detailId: string | null) => void,
	movieListItemModel: MovieListItemModel;
}

function MovieListItem(props: MovieListItemProps) {
	const filmWorldEnabled = props.movieListItemModel.providerIds.indexOf("1") !== -1;
	const cinemaWorldEnabled = props.movieListItemModel.providerIds.indexOf("2") !== -1;
	return (
		<TableRow
			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		>
			<TableCell size="medium" component="th" scope="row">
				{props.movieListItemModel.title}{'(' + props.movieListItemModel.releaseYear + ')'}
			</TableCell>
			<TableCell size="small" align="right">
				<StyledIconButton disabled={!filmWorldEnabled} iconComponent={<MovieIcon />} />
				<StyledIconButton disabled={!cinemaWorldEnabled} iconComponent={<PublicIcon />} />
				<StyledIconButton iconComponent={<CompareArrowsIcon />} onClick={() => props.setMovieDetailsId("test")}  />
			</TableCell>
		</TableRow>
	);
}

function StyledIconButton(props: {disabled?: boolean, iconComponent: ReactNode, onClick?: () => void}) {
	return (
		<IconButton
			size="large"
			edge="start"
			color="inherit"
			aria-label="menu"
			sx={{ mr: 2}}
			onClick={props.onClick}
			disabled={props.disabled ?? false}
		>
			{props.iconComponent}
		</IconButton>
	);
}

export default MovieListItem;