import { Skeleton, TableCell, TableRow } from "@mui/material";
import type { MovieDetailsResponse, ProviderRequest } from "../../tools/models";

export interface ProviderListItemSkeletonProps {
	request: ProviderRequest<MovieDetailsResponse>
}

function ProviderListItemSkeleton(props: ProviderListItemSkeletonProps) {
	return(
		<TableRow
			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		>
			<TableCell size="medium" component="th" scope="row">
			{props.request.providerId}
			</TableCell>
			<TableCell size="small" align="right">
			<Skeleton variant="circular" sx={{display: "inline-flex"}}>
				<span>$$$</span>
			</Skeleton>
			</TableCell>
		</TableRow>
	);
}

export default ProviderListItemSkeleton;