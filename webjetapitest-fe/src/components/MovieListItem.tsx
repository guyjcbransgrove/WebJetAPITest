import { IconButton, Skeleton, TableCell, TableRow } from "@mui/material";
import MovieIcon from '@mui/icons-material/Movie';
import PublicIcon from '@mui/icons-material/Public';
import ErrorIcon from '@mui/icons-material/Error';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useContext, type ReactNode } from "react";
import type { MovieListItemModel, ProviderState } from "./models";
import { ProviderStateContext } from "./contexts";

export interface MovieListItemProps {
	setSelectedMovieListItem: (detailId: MovieListItemModel | null) => void,
	movieListItemModel: MovieListItemModel;
}

function MovieListItem(props: MovieListItemProps) {
	const providerStates = useContext(ProviderStateContext)

	const filmWorldEnabled = props.movieListItemModel.providerIds.indexOf("Filmworld") !== -1;
	const cinemaWorldEnabled = props.movieListItemModel.providerIds.indexOf("Cinemaworld") !== -1;
	return (
		<TableRow
			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		>
			<TableCell size="medium" component="th" scope="row">
				{props.movieListItemModel.title}{'(' + props.movieListItemModel.releaseYear + ')'}
			</TableCell>
			<TableCell size="small" align="right">
				<StateAppropriateIcon state={providerStates.cinemaworldStatus} showDisabled={!cinemaWorldEnabled} iconComponent={<PublicIcon />} />
				<StateAppropriateIcon state={providerStates.filmworldStatus} showDisabled={!filmWorldEnabled} iconComponent={<MovieIcon />} />
				<StyledIconButton iconComponent={<CompareArrowsIcon />} onClick={() => props.setSelectedMovieListItem(props.movieListItemModel)}  />
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

const iconSkeletonStyling = {display: "inline-flex", marginTop: "1px", paddingBottom: "16px", marginLeft: "-12px", marginRight: "16px"};
function StateAppropriateIcon(props: {state: ProviderState, showDisabled: boolean, iconComponent: ReactNode}) {
	if (props.state === "loading") {
		return (
			<Skeleton sx={iconSkeletonStyling}>
				{props.iconComponent}
			</Skeleton>
		);
	}

	const renderedIcon = props.state === "errored" ? <ErrorIcon /> : props.iconComponent;
	return (
		<StyledIconButton disabled={props.showDisabled} iconComponent={renderedIcon} />
	);
}

export default MovieListItem;