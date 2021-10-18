import { ArtistProfile } from '../context/types'

//WIP: paging, sorting, searching props for get artist
export interface GetArtistsProps {
	limit: number;
	offset: number;
	sorting: string
}
export function retrieveArtists({ limit, offset, sorting }: GetArtistsProps): ArtistProfile[] {
	// export interface ArtistProfile {
	// 	id: number;
	// 	wallet_address: string;
	// 	name: string;
	// 	bio?: string;
	// 	socials?: Social[];
	// 	collection?: number[];
	// }
    return [
		{
			id: 0,
			wallet_address: 'testwell.near',
			name: 'Holy Web3 Nft'
		},
		{
			id: 1,
			wallet_address: 'testwell.near',
			name: 'Westside Blockchain'
		},
		{
			id: 2,
			wallet_address: 'testwell.near',
			name: 'Almond Arts Digital'
		},
		{
			id: 3,
			wallet_address: 'testwell.near',
			name: 'Arts Digital Unknown'
		},
		{
			id: 4,
			wallet_address: 'testwell.near',
			name: 'Future 3d Arts Flowers'
		}
	]
} 