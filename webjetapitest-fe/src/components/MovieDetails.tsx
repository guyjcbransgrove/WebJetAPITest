import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import MovieIcon from '@mui/icons-material/Movie';
import PublicIcon from '@mui/icons-material/Public';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import type { MovieListItemModel } from "./models";

export interface MovieDetailsProps {
	closeMovieDetails: () => void,
  selectedMovieListItem: MovieListItemModel | null
}

function MovieDetails(props: MovieDetailsProps) {
  const areDetailsOpen = props.selectedMovieListItem !== null;
	return (
	  <Dialog
        fullWidth={true}
        open={areDetailsOpen}
        onClose={props.closeMovieDetails}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {props.selectedMovieListItem?.title}
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow
                  key={'test'}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell size="medium" component="th" scope="row">
                    {'Movie Title'}
                  </TableCell>
                  <TableCell size="small" align="right"><MovieIcon/>{' '}<PublicIcon/>{' '}<CompareArrowsIcon/></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
		<DialogActions>
          <Button onClick={props.closeMovieDetails}>Close</Button>
        </DialogActions>
      </Dialog>
	)
}

export default MovieDetails;