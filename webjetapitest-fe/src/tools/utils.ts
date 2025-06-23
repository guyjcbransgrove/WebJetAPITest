import type { MovieDetailsResponse, MovieListItemModel } from "./models";

export function mergeList(existingList: MovieListItemModel[], newList: MovieListItemModel[]) {
	const combinedMap: Record<string, MovieListItemModel> = {};
	existingList.forEach(x => combinedMap[x.title] = x)
	newList.forEach(x => {
		if (combinedMap[x.title] !== undefined) {
			combinedMap[x.title] = { 
				...combinedMap[x.title], 
				providerIds: [...combinedMap[x.title].providerIds, ...x.providerIds],
				cwMovieId: combinedMap[x.title].cwMovieId ?? x.cwMovieId,
				fwMovieId: combinedMap[x.title].fwMovieId ?? x.fwMovieId
			}
			return;
		}
		combinedMap[x.title] = x;
	})
	const result = Object.keys(combinedMap).map(x => combinedMap[x]).sort((a, b) => {
		if (a.title < b.title) {
			return -1;
		}
		if (a.title > b.title) {
			return 1;
		}
		return 0;
	});
	return result;
}

export function findCheapestProvider(responses: MovieDetailsResponse[]) {
  let cheapestProviderResponse : MovieDetailsResponse | null = null;
  for (let i = 0; i < responses.length; i++) {
	const currentResponse = responses[i];
	if (cheapestProviderResponse === null) {
	  cheapestProviderResponse = currentResponse;
	  continue;
	}
	cheapestProviderResponse = cheapestProviderResponse?.movieDetails.priceInDollars > currentResponse.movieDetails.priceInDollars ? currentResponse : cheapestProviderResponse;
  }
  return cheapestProviderResponse;
}