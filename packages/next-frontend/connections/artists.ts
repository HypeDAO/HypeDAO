import { ArtistProfile, ArtistProfileRequest, GetArtistsParams } from "../types/artists";
import { Get, Post, Put } from "./helpers";

export function GetArtists(getArtistParams: GetArtistsParams): Promise<ArtistProfile[]> {
	return Get('/artist/profiles', getArtistParams)
}

export function GetArtist(id: number): Promise<ArtistProfile> {
	return Get(`/artist/profile/${id}`)
}

export function CreateArtist(createArtistRequest: ArtistProfileRequest): Promise<ArtistProfile> {
	return Post(`/artist/profile`, createArtistRequest)
}

export function UpdateArtistProfile(artistProfile: ArtistProfile): Promise<ArtistProfile> {
	return Put(`/artist/profile`, artistProfile)
}