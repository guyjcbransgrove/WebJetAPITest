export interface MovieListItemModel {
	movieId: string,
	title: string,
	releaseYear: number,
	providerIds: ProviderId[]
}

export interface MovieListResponse {
	providerId: string,
	movieList: MovieListItemModel[]
}

export type ProviderState = "loading" | "errored" | "loaded";
export type ProviderId = "Cinemaworld" | "Filmworld";