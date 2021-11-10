export interface ArtistProfile {
    id: number;
    wallet_address: string;
    name: string;
    bio?: string;
    socials?: Social[];
    collection?: number[];
}
export declare type ArtistProfileRequest = Omit<ArtistProfile, "id">;
export interface ArtistProfileMunged extends Omit<ArtistProfile, "collection"> {
    collection: NFT[];
}
export declare enum ArtistSorting {
    OldestMember = "id",
    NewestMember = "id DESC",
    AZ = "name",
    ZA = "name DESC",
    Random = "RANDOM ()",
    OldestFeatured = "start_date",
    NewestFeatured = "start_date DESC"
}
export declare enum ArtistFilter {
    pastFeatured = 0
}
export interface GetArtistsProps {
    limit: number;
    page: number;
    search: string;
    sorting: ArtistSorting;
    filter: ArtistFilter;
}
export declare enum SOCIAL_NAMES {
    FACEBOOK = "facebook",
    TWITTER = "twitter",
    INSTAGRAM = "instagram"
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
}
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
