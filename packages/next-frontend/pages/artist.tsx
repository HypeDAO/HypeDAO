import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import NftCard from "../components/artists/nft-card"
import Layout from "../components/layout"
import { GetArtist } from "../connections/artists"
import { ArtistProfile } from "../types/artists"
import utilStyles from '../styles/utils.module.css'
import ArtistInfo from "../components/artists/artist-info"

export default function Artist() {
	const [artist, setArtist] = useState<ArtistProfile>()
	const router = useRouter()
	const { id } = router.query
	const featured = artist?.collection?.[0]
	const NFTs = artist?.collection?.slice(1)

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
		<Layout>
			<main>
				{/* <h1 className={utilStyles.title}>{artist?.name}</h1> */}
				{featured && <NftCard nft={featured} />}
				{artist && <ArtistInfo artist={artist} />}
				{NFTs?.map(nft => <NftCard key={nft.id} nft={nft} />)}
			</main>
		</Layout>
	)
}