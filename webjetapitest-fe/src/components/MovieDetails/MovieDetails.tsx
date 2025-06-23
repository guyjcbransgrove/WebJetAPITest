import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableContainer } from "@mui/material";
import type { MovieDetailsResponse, MovieListItemModel } from "../../tools/models";
import { useEffect, useState } from "react";
import { useProviderRequest } from "../../tools/hooks";
import { fetchCinemaWorldDetails, fetchFilmWorldDetails } from "../../tools/api";
import { findCheapestProvider } from "../../tools/utils";
import ProviderListItem from "./ProviderListItem";
import ProviderListItemSkeleton from "./ProviderListItemSkeleton";

export interface MovieDetailsProps {
	closeMovieDetails: () => void,
  selectedMovieListItem: MovieListItemModel | null
}

function MovieDetails(props: MovieDetailsProps) {
  // request promise as state for incremental loading
  const filmworldRequest = useProviderRequest<MovieDetailsResponse>("Filmworld", () => fetchFilmWorldDetails(props.selectedMovieListItem!.fwMovieId!));
  const cinemaworldRequest = useProviderRequest<MovieDetailsResponse>("Cinemaworld", () => fetchCinemaWorldDetails(props.selectedMovieListItem!.cwMovieId!));
  const [unresolvedProviderRequests, setUnresolvedProviderRequests] = useState([filmworldRequest, cinemaworldRequest]);

  // movie details as state
  const [movieDetailResponses, setMovieDetailResponses] = useState<MovieDetailsResponse[]>([]);
  const [cheapestProvider, setCheapestProvider] = useState<MovieDetailsResponse | null>(null);

  // derivedstate
  const showCheapestProviderIcon = cheapestProvider !== null && unresolvedProviderRequests.length === 0;
  const areDetailsOpen = props.selectedMovieListItem !== null;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const firstResolved = Promise.any(unresolvedProviderRequests.map(x => x.request()));
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
  }, [unresolvedProviderRequests]);

  useEffect(() => {
    const cheapestProvider = findCheapestProvider(movieDetailResponses);
    setCheapestProvider(cheapestProvider);
  }, [movieDetailResponses]);
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
                  <ProviderListItem 
                    key={response.providerId + 'response'}
                    response={response}
                    cheapestProvider={cheapestProvider}
                    showCheapestProviderIcon={showCheapestProviderIcon}
                  />
              ))}
              {unresolvedProviderRequests.map(request => (
                <ProviderListItemSkeleton 
                  key={request.providerId + 'request'}
                  request={request}
                />
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