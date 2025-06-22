export interface MovieListItemModel {
	movieId: string,
	title: string,
	releaseYear: number,
	providerIds: ProviderId[]
}

export interface MovieListResponse {
	providerId: ProviderId,
	movieList: MovieListItemModel[]
}

export interface MovieDetailModel {
	priceInDollars: number;
}

export interface MovieDetailsResponse {
	providerId: ProviderId;
	movieDetails: MovieDetailModel;
}

export interface ProviderRequest<T> {
	providerId: string,
	request: Promise<T>,
	providerState: ProviderState,
	setProviderState: React.Dispatch<React.SetStateAction<ProviderState>>
}

export type ProviderState = "loading" | "errored" | "loaded";
export type ProviderId = "Cinemaworld" | "Filmworld";