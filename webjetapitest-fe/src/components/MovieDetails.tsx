import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Skeleton, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import type { MovieDetailsResponse, MovieListItemModel } from "./models";
import { useEffect, useState } from "react";
import { useProviderRequest } from "./hooks";
import { FAKE_fetchCinemaWorldDetails, FAKE_fetchFilmWorldDetails } from "./api";

export interface MovieDetailsProps {
	closeMovieDetails: () => void,
  selectedMovieListItem: MovieListItemModel | null
}

function MovieDetails(props: MovieDetailsProps) {
  // request promise as state for incremental loading
  const filmworldRequest = useProviderRequest<MovieDetailsResponse>("Filmworld", FAKE_fetchFilmWorldDetails());
  const cinemaworldRequest = useProviderRequest<MovieDetailsResponse>("Cinemaworld", FAKE_fetchCinemaWorldDetails());
  const [unresolvedProviderRequests, setUnresolvedProviderRequests] = useState([filmworldRequest, cinemaworldRequest]);

  // movie details as state
  const [movieDetailResponses, setMovieDetailResponses] = useState<MovieDetailsResponse[]>([]);

  // derivedstate
  const areDetailsOpen = props.selectedMovieListItem !== null;

  useEffect(() => {
      const fetchMovieDetails = async () => {
        const firstResolved = Promise.any(unresolvedProviderRequests.map(x => x.request));
        try {
          const response = await firstResolved;
          const providerRequest = unresolvedProviderRequests.find(x => x.providerId === response.providerId);
          providerRequest?.setProviderState("loaded");
          setUnresolvedProviderRequests(unresolvedProviderRequests.filter(x => x.providerId !== response.providerId))
          setMovieDetailResponses([...movieDetailResponses, response]);
        }
        catch(ex) {
          if (ex instanceof AggregateError && unresolvedProviderRequests.length > 0) {
            // Promise.any() will only return an AggregateError if all promises are rejected so this is safe to do
            unresolvedProviderRequests.forEach(x => x.setProviderState("errored"));
            setUnresolvedProviderRequests([]);
          }
        }
      };
      fetchMovieDetails();
    });
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
              {movieDetailResponses.map(response => (
                <TableRow
                  key={response.providerId + 'response'}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell size="medium" component="th" scope="row">
                    {response.providerId}
                  </TableCell>
                  <TableCell size="small" align="right">{response.movieDetails.priceInDollars}</TableCell>
                </TableRow>
              ))}
              {unresolvedProviderRequests.map(request => (
                <TableRow
                  key={request.providerId + 'request'}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell size="medium" component="th" scope="row">
                    {request.providerId}
                  </TableCell>
                  <TableCell size="small" align="right">
                    <Skeleton variant="circular" sx={{display: "inline-flex"}}>
                      <span>$$$</span>
                    </Skeleton>
                  </TableCell>
                </TableRow>
              ))}
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