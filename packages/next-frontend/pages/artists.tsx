import classNames from "classnames";
import { useEffect, useState } from "react";
import NftCard from "../components/artists/nft-card";
import Layout from "../components/layout";
import { GetArtists } from "../connections/artists";
import utilStyles from '../styles/utils.module.css'
import { ArtistProfile, GetArtistsParams } from "../types/artists";

export default function Artists() {
	const [artists, setArtists] = useState<ArtistProfile[]>([])
	const [artistQueryParams, setAristQueryParams] = useState<GetArtistsParams>({})
	useEffect(() => {
		async function loadArtists() {
			try {
				const _artists = await GetArtists(artistQueryParams)
				setArtists(_artists)
			} catch (e) {
				console.log("Error loading Artists: ", e)
			}

		}
		loadArtists()
	}, [artistQueryParams])
	return (
		<Layout>
			<main>
				<h1 className={utilStyles.title}>Artists</h1>
				<div className={classNames(utilStyles.scrim, utilStyles.centeredList)}>
					{artists.map((artist) => {
						const highlightedNft = artist.collection?.[0]
						if (!highlightedNft) return null
						return (
							<NftCard
								key={artist.id}
								artist={artist}
								nft={highlightedNft}
							/>
						)
					}
					)}
				</div>
			</main>
		</Layout>
	)
}