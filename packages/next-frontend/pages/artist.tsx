import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import NftCard from "../components/artists/nft-card"
import Layout from "../components/layout"
import { GetArtist } from "../connections/artists"
import { ArtistProfile } from "../types/artists"
import ArtistInfo from "../components/artists/artist-info"
import ArtistDashboard from "../components/artists/artist-dashboard"
import styles from "../styles/pages/Artist.module.css"
import utilStyles from "../styles/utils.module.css"
import classNames from "classnames"

export default function Artist() {
	const [artist, setArtist] = useState<ArtistProfile>()
	const router = useRouter()
	const { id } = router.query
	const featuredCard = artist?.collection?.[0]
	const NFTs = artist?.collection?.slice(1)

	useEffect(() => {
		async function loadArtist() {
			if (!id) return
			try {
				const _artist = await GetArtist(String(id))
				setArtist(_artist)
			} catch (e) {
				console.log("Error loading Artist: ", e)
			}
		}
		loadArtist()
	}, [id])

	return (
		<Layout withScrim contained={false}>
			<main className={styles.artist}>
				{!id && 
					<ArtistDashboard />
				}
				{id && 
					<>
						<div className={classNames(styles.highlight, utilStyles.scrim)}>
							{featuredCard && <NftCard nft={featuredCard} />}
							{artist && <ArtistInfo artist={artist} />}
						</div>
						<div className={classNames(styles.list)}>
							{NFTs?.map(nft => <NftCard key={nft.id} nft={nft} />)}
						</div>
					</>
				}
			</main>
		</Layout>
	)
}