import classNames from "classnames";
import Layout from "../../components/layout";
import utilStyles from '../../styles/utils.module.css'
import styles from '../../styles/pages/Proposals.module.css'
import { getProposals } from '../../hooks/near-dao'
import { ApplicationContext } from '../../context/state';
import React, { useEffect, useState } from "react";
import Link from "next/link";

import ProposalBox from '../../components/proposal/ProposalBox'
import { ArtistProfile, Proposal } from "../../context/types";
import { retrieveArtists } from "../../connections/artists";
import BasicCard from "../../components/database/BasicCard";


export default function Proposals() {
	const [artists, setArtists] = useState<ArtistProfile[]>([])
	const [error, setError] = useState("")
	const {state, dispatch} = React.useContext(ApplicationContext)

	useEffect(() => {
		const loadArtists = async () => {
			const artists = await retrieveArtists({limit: 100, offset: 0, sorting: 'asc'})
			if (!artists) {
				setError("Error getting artists from API.")
			} else {
				console.log(artists)
				setArtists(artists)
			}
		}
		loadArtists()
	}, [])

	const loadingMessage = error ? error : "...Loading"

	return (
		<Layout>
			<main>
				<h1 className={utilStyles.title}>Artists</h1>
				<ul className={styles.proposalList}>
					{artists.map((artist, i) => (
						<BasicCard
							title={artist.name}
						/>)
					)}
					{/* {!artists.length
						? <h2 className={classNames({ [utilStyles.error]: error }, utilStyles.centerContent)}>{loadingMessage}</h2>
						: null} */}
				</ul>
			</main>
		</Layout>
	)
}