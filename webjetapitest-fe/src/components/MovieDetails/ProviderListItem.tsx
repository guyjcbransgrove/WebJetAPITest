import { TableCell, TableRow } from "@mui/material";
import type { MovieDetailsResponse } from "../../tools/models";
import { StyledIconButton } from "../StyledIconButton";
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

export interface ProviderListItemProps {
	response: MovieDetailsResponse,
	cheapestProvider: MovieDetailsResponse | null;
	showCheapestProviderIcon: boolean;
}
function ProviderListItem(props: ProviderListItemProps) {
	const isCheapestProvider = props.response.providerId === props.cheapestProvider?.providerId && props.showCheapestProviderIcon;
	return (
		<TableRow
			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		>
		<TableCell size="medium" component="th" scope="row">
			{props.response.providerId}{' '}{isCheapestProvider && <StyledIconButton iconComponent={<PriceCheckIcon />}/>}
		</TableCell>
		<TableCell size="small" align="right">${props.response.movieDetails.priceInDollars}</TableCell>
		</TableRow>
	);
}

export default ProviderListItem;