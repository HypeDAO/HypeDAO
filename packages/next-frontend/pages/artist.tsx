import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import NftCard from "../components/artists/nft-card"
import Layout from "../components/layout"
import { GetArtist } from "../connections/artists"
import { ArtistProfile } from "../types/artists"
import ArtistInfo from "../components/artists/artist-info"
import styles from "../styles/pages/Artist.module.css"
import utilStyles from "../styles/utils.module.css"
import classNames from "classnames"

export default function Artist() {
	const [artist, setArtist] = useState<ArtistProfile>()
	const router = useRouter()
	const { id } = router.query
	const featuredCard = artist?.collection?.[0]
	const NFTs = artist?.collection?.slice(1) ? [...artist.collection, ...artist.collection] : []



	useEffect(() => {
		async function loadArtist() {
			if (!id) return
			try {
				const _artist = await GetArtist(Number(id))
				setArtist(_artist)
			} catch (e) {
				console.log("Error loading Artist: ", e)
			}
		}
		loadArtist()
	}, [id])
	return (
		<>
			<Layout withScrim>
				<main className={styles.artist}>
					<div className={classNames(styles.highlight, utilStyles.scrim)}>
						{featuredCard && <NftCard nft={featuredCard} />}
						{artist && <ArtistInfo artist={artist} />}
					</div>
				</main>
				<div className={classNames(styles.list)}>
					{NFTs?.map(nft => <NftCard key={nft.id} nft={nft} />)}
				</div>
			</Layout>
		</>
	)
}