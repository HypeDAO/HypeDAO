import { ArtistProfile, ArtistProfileRequest, GetArtistsParams } from "../types/artists";
import { Get, Post, Put } from "./helpers";

export function GetArtists(getArtistParams: GetArtistsParams): Promise<ArtistProfile[]> {
	// using POST instead of GET so we can include a body
	return Post('/artist/profiles', getArtistParams)
}

export function GetArtist(wallet_address: string): Promise<ArtistProfile> {
	return Get(`/artist/profile/${wallet_address}`)
}

export function CreateArtist(createArtistRequest: ArtistProfileRequest): Promise<ArtistProfile> {
	return Post(`/artist/profile`, createArtistRequest)
}

export function UpdateArtistProfile(artistProfile: ArtistProfile): Promise<ArtistProfile> {
	return Put(`/artist/profile`, artistProfile)
}

export function UpdateArtistNftList(artistProfile: any): Promise<ArtistProfile> {
	return Put(`/artist/profile`, artistProfile)
}