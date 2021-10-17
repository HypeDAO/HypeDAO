//If updating types within the types folder please make sure to do so in both the next-frontend and ts-api workspaces;
export interface ArtistProfile {
	id: number;
	wallet_address: string;
	name: string;
	bio?: string;
	socials?: Social[];
	collection?: number[];
}
export type ArtistProfileRequest = Omit<ArtistProfile, "id">

export enum ArtistSorting {
	OldestMember = "id",
	NewestMember = "id DESC",
	AZ = "name",
	ZA = "name DESC",
	Random = "RANDOM ()",
	OldestFeatured = "start_date",
	NewestFeatured = "start_date DESC"
}
export enum ArtistFilter {
	pastFeatured
}
export interface GetArtistsProps {
	limit: number;
	page: number;
	search: string;
	sorting: ArtistSorting;
	filter: ArtistFilter;
}

export enum SOCIAL_NAMES {
	FACEBOOK = "facebook",
	TWITTER = "twitter",
	INSTAGRAM = "instagram",
}

export interface Social {
	name: SOCIAL_NAMES | string;
	url: string;
}

export interface NFT {
	id: number;
	owner_address: string;
	title: string;
	description?: string;
	market_url: string;
	preview_url?: string;
};

export interface FeaturedArtist {
	id: number;
	wallet_address: string;
	is_current: boolean;
	start_date: Date;
}

export interface FeaturedArtistEntries {
	id: number;
	wallet_address: string;
	tickets_entered: number;
	entry_date: Date;
}