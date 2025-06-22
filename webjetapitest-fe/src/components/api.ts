import type { MovieDetailsResponse, MovieListResponse } from "./models";

export const FAKE_fetchCinemaworldList = () => new Promise<MovieListResponse>((resolve, reject) => {
	setTimeout(() => {
		if (Math.random() * 100 > 99) reject();
		resolve(
			{
				providerId: "Cinemaworld", 
				movieList: [
					{ movieId: "test1", title: "test1", releaseYear: 2001, providerIds: ["Cinemaworld"] },
					{ movieId: "test2", title: "test2", releaseYear: 2002, providerIds: ["Cinemaworld"] },
					{ movieId: "test3", title: "test3", releaseYear: 2003, providerIds: ["Cinemaworld"] },
					{ movieId: "test4", title: "test4", releaseYear: 2004, providerIds: ["Cinemaworld"] },
					{ movieId: "test5", title: "test5", releaseYear: 2005, providerIds: ["Cinemaworld"] },
				]
			}
		)
	}, Math.random() * 10000)
});

export const FAKE_fetchFilmworldList = () => new Promise<MovieListResponse>((resolve, reject) => {
	setTimeout(() => {
		if (Math.random() * 100 > 99) reject();
		resolve(
			{
				providerId: "Filmworld", 
				movieList: [
					{ movieId: "test4", title: "test4", releaseYear: 2004, providerIds: ["Filmworld"] },
					{ movieId: "test5", title: "test5", releaseYear: 2005, providerIds: ["Filmworld"] },
					{ movieId: "test6", title: "test6", releaseYear: 2006, providerIds: ["Filmworld"] },
					{ movieId: "test7", title: "test7", releaseYear: 2007, providerIds: ["Filmworld"] },
					{ movieId: "test8", title: "test8", releaseYear: 2008, providerIds: ["Filmworld"] },
				]
			}
		)
	}, Math.random() * 10000)
});

export const FAKE_fetchFilmWorldDetails = () => new Promise<MovieDetailsResponse>((resolve, reject) => {
	setTimeout(() => {
		if (Math.random() * 100 > 99) reject();
		resolve(
			{
				providerId: "Filmworld", 
				movieDetails: { priceInDollars: 100 }
			}
		)
	}, Math.random() * 10000)
});

export const FAKE_fetchCinemaWorldDetails = () => new Promise<MovieDetailsResponse>((resolve, reject) => {
	setTimeout(() => {
		if (Math.random() * 100 > 99) reject();
		resolve(
			{
				providerId: "Cinemaworld", 
				movieDetails: { priceInDollars: 50 }
			}
		)
	}, Math.random() * 10000)
});