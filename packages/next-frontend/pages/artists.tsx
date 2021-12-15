import classNames from "classnames";
import { useEffect, useState } from "react";
import ArtistInfo from "../components/artists/artist-info";
import NftCard from "../components/artists/nft-card";
import Layout from "../components/layout";
import { GetArtists } from "../connections/artists";
import styles from "../styles/pages/Artist.module.css"
import utilStyles from '../styles/utils.module.css'
import { ArtistProfile, GetArtistsParams } from "../types/artists";

export default function Artists() {
	const [artists, setArtists] = useState<ArtistProfile[]>([])
	const [artistQueryParams, setAristQueryParams] = useState<GetArtistsParams>({})
	const [featuredArtist, setFeaturedArtist] = useState<ArtistProfile>()

	const featuredCard = featuredArtist?.collection?.[0]
	useEffect(() => {
		async function loadArtists() {
			try {
				const _artists = await GetArtists(artistQueryParams)
				setArtists(_artists)
			} catch (e) {
				console.log("Error loading Artists: ", e)
			}

			// try {
			// 	const _featured = await GetFeaturedArtist()
			// 	setFeaturedArtist(_featured)
			// } catch (e) {
			// 	console.log("Error loading Featured Artist: ", e)
			// }
		}
		loadArtists()
	}, [artistQueryParams])

	return (
		<Layout withScrim contained={false}>
			<main className={styles.artist}>
				<h1 className={utilStyles.title}>{featuredCard ? "Featured Artist" : "Artists"}</h1>
				{featuredCard && (
					<>
						<div className={classNames(styles.highlight, utilStyles.scrim)}>
							<NftCard nft={featuredCard} />
							<ArtistInfo artist={featuredArtist!} />
						</div>
					</>
				)
				}



				<div className={classNames(styles.list)}>
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