import { Skeleton, TableCell, TableRow } from "@mui/material";
import MovieIcon from '@mui/icons-material/Movie';

const iconSkeletonStyling = {display: "inline-flex", padding: "12px", marginLeft: "-12px", marginRight: "16px"};

function MovieListItemSkeleton() {
	return (
		<TableRow
			key={'test'}
			sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
		>
			<TableCell size="medium" component="th" scope="row">
				<Skeleton variant="rectangular" />
			</TableCell>
			<TableCell size="small" align="right">
				<Skeleton sx={iconSkeletonStyling}>
					<MovieIcon />
				</Skeleton>
				<Skeleton sx={iconSkeletonStyling}>
					<MovieIcon />
				</Skeleton>
				<Skeleton sx={iconSkeletonStyling}>
					<MovieIcon />
				</Skeleton>
			</TableCell>
		</TableRow>
	);
}

export default MovieListItemSkeleton;