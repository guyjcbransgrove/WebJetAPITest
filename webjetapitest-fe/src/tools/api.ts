import type { MovieDetailsResponse, MovieListResponse } from "./models";

const apiBase = "https://localhost:7001/Movie/";

export const fetchCinemaworldList = async () => {
	const response = await fetch(apiBase + "list/Cinemaworld");
	return await response.json() as MovieListResponse;
}

export const fetchFilmworldList = async () => {
	const response = await fetch(apiBase + "list/Filmworld");
	return await response.json() as MovieListResponse;
}

export const fetchFilmWorldDetails = async (movieId: string) => {
	const response = await fetch(apiBase + "Filmworld/" + movieId);
	return await response.json() as MovieDetailsResponse;
};

export const fetchCinemaWorldDetails = async (movieId: string) => {
	const response = await fetch(apiBase + "Cinemaworld/" + movieId);
	return await response.json() as MovieDetailsResponse;
};