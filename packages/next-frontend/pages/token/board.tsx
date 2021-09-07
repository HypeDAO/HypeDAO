import classNames from "classnames";
import Layout from "../../components/layout";
import utilStyles from '../../styles/utils.module.css'
import styles from '../../styles/pages/Bounties.module.css'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { HypeBalanceInterface, getActiveAccounts, requestHypeBalance } from "../../hooks/near"
import React, { useEffect, useState } from "react";
import { ApplicationContext } from '../../context/state';

export default function HypeBoard() {
	const [balances, setBalances] = useState<HypeBalanceInterface[]>([])
	const [error, setError] = useState("")
    const {state, dispatch} = React.useContext(ApplicationContext)

	useEffect(() => {
		// Always fired...
    }, [])

    useEffect(() => {
        if (state.wallet) {
			const updateCachedAccounts = async () => {
				const activeAccounts = await getActiveAccounts()
				if (!activeAccounts) {
					setError("Error getting active accounts from JSON file cache.")
				}
				else {
					let compare = (b1: HypeBalanceInterface, b2: HypeBalanceInterface) => {
						return b2.balance - b1.balance;
					}
					let promises = activeAccounts.map((account) => {
						if (!state.wallet) return
						return requestHypeBalance(state.wallet, account)
					})
					Promise.allSettled(promises)
						.then((results) => {
							let balances = results.map((result) => {
								// @ts-ignore https://github.com/microsoft/TypeScript/issues/42012
								const value = result.value
								return {
									account: value.account,
									balance: value.balance
								}
							})
							let nonZeroBalances = balances.filter(hypeBalance => {
								return hypeBalance.balance > 0
							})
							let sortedBalances = nonZeroBalances.sort(compare)
							setBalances(sortedBalances)
						});
					}
			}
			updateCachedAccounts()
        }
    }, [state.wallet])

	const loadingMessage = error ? error : "...Loading"

	return (
		<Layout>
			<main>
				<h1 className={utilStyles.title}>Leaderboard</h1>
				<ul className={utilStyles.scrim}>
					<GridCell
						rank="Rank"
						account="Account"
						balance="$HYPE"
						isHeader
					/>
					{balances.map((entry, i) => (
						<GridCell
							rank={(i + 1).toString()}
							key={entry.account + i}
							account={entry.account}
							balance={entry.balance.toString()}
						/>)
					)}
					{!balances.length
						? <h2 className={classNames({ [utilStyles.error]: error }, utilStyles.centerContent)}>{loadingMessage}</h2>
						: null}
				</ul>
			</main>
		</Layout>
	)
}

interface GridCellProps {
	rank: string;
	account: string;
	balance: string;
	isHeader?: boolean;
}
function GridCell({ rank, account, balance, isHeader }: GridCellProps) {
    const getIcon = () => {
        return <DoneOutlineIcon style={{ color: 'white' }} />
    }
	return (
		<li className={classNames(styles.gridCell, { [styles.gridHeader]: isHeader })}>
			<p>{rank}</p>
			<p>{account}</p>
			<p>{balance}</p>
		</li >
	)
}