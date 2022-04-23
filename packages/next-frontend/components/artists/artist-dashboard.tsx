import React, { useEffect, useState, useRef } from "react"
import styles from '../../styles/components/hype-registration-button.module.css'
import classNames from "classnames"
import { getWalletConnection } from "../../hooks/near"
import NftCard from "../../components/artists/nft-card"
import { ApplicationContext } from '../../context/state';
import { ArtistProfile } from "../../types/artists"
import { GetArtist } from "../../connections/artists";
import NftCreation from "./nft-creation"
import ArtistCreation from "./artist-page-creation"
import Grid from '@mui/material/Grid';

export default function ArtistDashboard() {
    const [isConnected, setIsConnected] = useState(false)
	const { state, dispatch } = React.useContext(ApplicationContext)
	const { wallet } = state
    const wallet_address = wallet && wallet.account().accountId ? wallet.account().accountId.replace(/\./g,'-') : '';
    const [artist, setArtist] = useState<ArtistProfile>()
	const NFTs = artist?.collection

	const [isPublic, setIsPublic] = React.useState(false);//!isPublic displays delete button on nft-card

	const artistInit = async () => {
		if (!wallet || !wallet.account().accountId) return;

		const wallet_address = wallet.account().accountId?.replace(/\./g,'-')
		let my_artist

		try {
			my_artist =  await GetArtist(wallet_address);
			setArtist(my_artist);
		} catch(e) {
			my_artist = null;
		}
	}

    useEffect(() => {
        const connectWallet = async () => {
            if (!process.env.network) return

            const _wallet = await getWalletConnection(process.env.network)
            if (!_wallet) return;

            dispatch({ type: "WALLET_CONNECTED", payload: _wallet })
        }

        if (!wallet) {
            connectWallet()
        }
    }, [dispatch, wallet])

	useEffect(() => {
		setIsConnected(!!wallet?.isSignedIn())

		artistInit();
	}, [wallet])

	return (
        <div className={styles.registerButtonContainer}>
			{isConnected && !artist && (//logged in, no profile = artist creation
				<>
					<p>HYPE Dao Artist?  Want to be one?</p>
					<ArtistCreation
                        wallet_address={wallet_address}
                        artist={artist}
                    />
				</>
			)}
			{isConnected && artist && (//logged in, has profile = artist page update
				<Grid container spacing={2}>
					<Grid item md={6} xs={12}>
						<h3>{artist.wallet_address}</h3>
						<p>{artist.bio}</p>
					</Grid>
					<Grid item md={6} xs={12}>
			  			{artist.socials?.map(social => {
							  if (social.name && social.url) {
								return (
									<p>
										{social.name}:
										<a href={social.url}> {social.url}</a>
									</p>
								  );
							  }
						  })}
					</Grid>
					<Grid item md={4} xs={6} >
						<ArtistCreation
                        	wallet_address={wallet_address}
                        	artist={artist}
                        	onChange={artistInit}
                    	/>
					</Grid>
					<Grid item md={8} xs={6}>
						<NftCreation artist={artist} wallet={artist.wallet_address} onChange={artistInit} />
					</Grid>
					<div className={classNames(styles.list)}>
						<Grid container spacing={2}>
						{NFTs?.map(nft => 
							<Grid item>
								<NftCard key={nft.id} nft={nft} artist={artist} isPublic={isPublic} onChange={artistInit} />
							</Grid>
						)}
						</Grid>
					</div>
		  		</Grid>
			)}
			{!isConnected && !artist && (//logged out, no profile
				<>
				</>
			)}
		</div>
	)
}