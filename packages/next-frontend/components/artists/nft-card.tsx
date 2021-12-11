import { useState, useRef, useEffect } from 'react';
import Image from 'next/image'
import classNames from 'classnames';
import Modal from '../modal';
import utilStyles from '../../styles/utils.module.css'
import Skeleton from '@mui/material/Skeleton';
import styles from '../../styles/components/nft-card.module.css'
import { ArtistProfile, NFT, UrlContent } from '../../types/artists';
import { GetLinkPreview } from '../../connections/nfts';

interface NftCardProps {
	nft: NFT
	artist?: ArtistProfile
}
export default function NftCard({ nft, artist }: NftCardProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [mediaLoaded, setMediaLoaded] = useState(false)
	const [showVideo, setShowVideo] = useState(false)
	const [urlContent, setUrlContent] = useState<UrlContent>()

	const contentRef = useRef<HTMLDivElement>(null)

	const description = nft?.description
	const title = nft?.title
	const url = nft?.market_url
	const media = urlContent?.images[0]

	const artistName = artist?.name
	const artistLink = `/artist?id=${artist?.id}`

	useEffect(() => {
		if (showVideo) {
			window.addEventListener("touchstart", handleStop)
		}
		return () => window.removeEventListener("touchstart", handleStop)
	}, [showVideo])

	useEffect(() => {
		async function setContent() {
			try {
				const content = await GetLinkPreview(url)
				setUrlContent(content)
			} catch (e) {
				console.error("Error fetching url Content: ", e)
			}
		}
		setContent()
	}, [url])


	function handleStop(e: any) {
		const path = e.composedPath()
		for (const item of path) {
			if (item === contentRef?.current) return
		}
		setShowVideo(false)
	}
	function closeModal() {
		setIsOpen(false)
		setShowVideo(false)
	}
	function openModal() {
		setShowVideo(false)
		setIsOpen(true)
	}

	const Content = ({ playing, inModal }: { playing: boolean, inModal?: boolean }) => {
		const open = !inModal ? openModal : () => null
		return (
			<div ref={contentRef} className={styles.content}>
				<div className={classNames(styles.mediaContainer, { [styles.hidden]: !mediaLoaded })}>
					{media &&
						<Image alt={title} src={media} layout="fill" objectFit="contain" onClick={open} onLoad={() => setMediaLoaded(true)} />
					}
				</div>

				<div className={styles.infoContainer} onClick={open}>
					<h3>{title}</h3>
				</div>
				<p className={styles.description} onClick={open}>{description}</p>
				<a
					href={url}
					target="_blank" rel="noopener noreferrer"
					className={classNames(
						utilStyles.primaryButton,
						styles.buyButton,
						{ [styles.hidden]: !mediaLoaded }
					)}
				>
					Go to Market
				</a>
			</div>
		)
	}

	return (
		<div>
			<div className={styles.card}>
				<Content playing={!isOpen} />
				<Skeleton
					variant="rectangular"
					height="31rem"
					animation="wave"
					className={classNames(styles.skeleton, { [styles.hidden]: mediaLoaded })}
				/>
			</div>
			{artistName &&
				<h3 className={styles.artistName}>
					<a href={artistLink}>by {artistName}</a>
				</h3>
			}
			<Modal
				isOpen={isOpen}
				onClose={closeModal}
			>
				<div className={styles.modalContent}>
					<Content playing={isOpen} inModal />
				</div>
			</Modal>
		</div>
	)
}