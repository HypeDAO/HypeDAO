import { ArtistProfile } from "../types/artists";

//WIP: paging, sorting, searching props for get artist
export interface GetArtistsProps {
	limit: number;
	offset: number;
	sorting: string
}
export function getArtists({ limit, offset, sorting }: GetArtistsProps) {
	// return fetch("")
}