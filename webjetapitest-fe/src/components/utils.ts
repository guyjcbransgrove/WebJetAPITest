import type { MovieListItemModel } from "./models";

export function mergeList(existingList: MovieListItemModel[], newList: MovieListItemModel[]) {
	const combinedMap: Record<string, MovieListItemModel> = {};
	existingList.forEach(x => combinedMap[x.movieId] = x)
	newList.forEach(x => {
		if (combinedMap[x.movieId] !== undefined) {
			combinedMap[x.movieId] = { ...combinedMap[x.movieId], providerIds: [...combinedMap[x.movieId].providerIds, ...x.providerIds] }
			return;
		}
		combinedMap[x.movieId] = x;
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