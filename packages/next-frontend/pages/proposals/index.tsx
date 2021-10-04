import classNames from "classnames";
import Layout from "../../components/layout";
import utilStyles from '../../styles/utils.module.css'
import styles from '../../styles/pages/Proposals.module.css'
import { getProposals } from '../../hooks/near-dao'
import { ApplicationContext } from '../../context/state';
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import Link from "next/link";

import ProposalBox from '../../components/proposal/ProposalBox'
import { Proposal } from "../../context/types";


export default function Proposals() {
	const [proposals, setProposals] = useState<Proposal[]>([])
	const [error, setError] = useState("")
	const {state, dispatch} = React.useContext(ApplicationContext)

	useEffect(() => {
		const loadProposals = async () => {
			if (!state.wallet)
				return
			const proposals = await getProposals(state.wallet)
			if (!proposals) {
				setError("Error getting proposals from Sputnik contract.")
			}
			else {
				let compare = (p1: Proposal, p2: Proposal) => {
					return p2.id - p1.id;
				}
				let sortedProposals = proposals.sort(compare)
				console.log(sortedProposals)
				setProposals(sortedProposals)
			}
		}
		loadProposals()
	}, [state.wallet])

	const loadingMessage = error ? error : "...Loading"

	return (
		<Layout>
			<main>
				<h1 className={utilStyles.title}>Proposals</h1>
				<Link href={"/proposals/new"} passHref>
					<button className={classNames(utilStyles.primaryButton, styles.accountButton)}>
						New Proposal
					</button>
				</Link>
				<ul className={styles.proposalList}>
					{proposals.map((proposal, i) => (
						<ProposalBox
							key={"proposal-box-" + i}
							proposal={proposal}
						/>)
					)}
					{!proposals.length
						? <h2 className={classNames({ [utilStyles.error]: error }, utilStyles.centerContent)}>{loadingMessage}</h2>
						: null}
				</ul>
			</main>
		</Layout>
	)
}