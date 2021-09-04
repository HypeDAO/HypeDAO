import { useEffect, useState } from "react"
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/components/hype-registration-button.module.css'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import classNames from "classnames"
import { getHypeBalance, getIsRegistered, getWalletConnection, registerToken, walletSignIn, walletSignOut } from "../hooks/near"
import { useRouter } from "next/dist/client/router"
import Modal from "./modal";
import { ApplicationContext } from '../context/state';
import { WalletConnection } from "near-api-js";

export default function HypeRegistrationButton() {
	const [modalOpen, setModalOpen] = useState(false)
	const [isConnected, setIsConnected] = useState(false)
	const [isRegistered, setIsRegistered] = useState(false)
	const [hypeBalance, setHypeBalance] = useState<string | null>(null)
	const {state, dispatch} = React.useContext(ApplicationContext)

	const router = useRouter()
	async function handleWalletConnection() {
		if (!state.wallet) return
		walletSignIn(state.wallet) 
	}

	function handleHypeRegistration() {
		if (!state.wallet?.isSignedIn()) return;
		registerToken(state.wallet)
	}

	function signOut() {
		if (!state.wallet?.isSignedIn()) return;
		router.replace(router.pathname)
		setIsConnected(false)
		walletSignOut(state.wallet)
	}

	function openModal() {
		setModalOpen(true)
	}
	function closeModal() {
		setModalOpen(false)
	}
	}

	}

	}

	useEffect(() => {
		}
		//Sets isConnected true if wallet is signed in, false if not
		setIsConnected(!!state.wallet?.isSignedIn())

		const getBalance = async () => {
			const wallet = state.wallet
			if (!wallet) return
			const balance = await getHypeBalance(wallet)

			if (!balance || !getIsRegistered(wallet)) return;
			setHypeBalance(balance)
			setIsRegistered(true)
		}
		if (state.wallet?.isSignedIn()) {
			getBalance()
		}
	}, [state.wallet])

	useEffect(() => {
		const connectWallet = async (dispatch: any) => {
			const _wallet = await getWalletConnection()
			if (!_wallet) return;
			// Set wallet on global state object, such that it can be
			// used in other components.
			dispatch({ type: "WALLET_CONNECTED", payload: _wallet })
		}
		if (!state.wallet) {
			connectWallet(dispatch)
		}
	})

	return (
		<div className={styles.registerButtonContainer}>
			{!isConnected && (
				<button
					className={utilStyles.secondaryButton}
					onClick={handleWalletConnection}
				>
					Connect NEAR Wallet
				</button>
			)}
			{isConnected && !isRegistered && (
				<button
					className={utilStyles.primaryButton}
					onClick={handleHypeRegistration}
				>
					Register for $HYPE
				</button>
			)}
			{isConnected && isRegistered && (
				//I'm thinking there will be our logo here 
				<h3 className={classNames(styles.balance, utilStyles.primaryButton)}>$HYPE: {hypeBalance}</h3>
			)}

			{(!isConnected || !isRegistered) && (
				<button className={classNames(utilStyles.noStyle, utilStyles.infoIcon, styles.moreInfoIcon)} onClick={openModal}>
					<InfoOutlinedIcon fontSize="small" />
				</button>
			)}

			{isConnected && (
				<button className={classNames(utilStyles.noStyle, utilStyles.infoIcon, styles.signOutIcon, { [styles.single]: isRegistered })} onClick={signOut}>
					<HighlightOffOutlinedIcon fontSize="small" />
				</button>
			)}


			<Modal
				isOpen={modalOpen}
				onClose={closeModal}
			>
				<h2>This FAQ section is still a work in progress...</h2>
				<h3>
					If you are experiencing issues please contact <a href="https://twitter.com/EV3RETH" target="_blank" rel="noopener noreferrer">EV3RETH</a> via twitter or join our <a href="https://t.me/hypedao" target="_blank" rel="noopener noreferrer">Telegram</a>.
				</h3>
				<p>
					These reports are always welcome as we want to help provide the best experience possible for you and all those that follow! The more details about the issue the better and screenshots are greatly appreciated, especially if they are of a specific error message.
				</p>
			</Modal>
		</div>
	)
}