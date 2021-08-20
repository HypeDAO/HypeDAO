import { useEffect, useState } from "react"
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/components/hype-registration-button.module.css'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import classNames from "classnames"
import { getHypeBalance, getIsRegistered, getWalletConnection, registerToken, walletSignIn, walletSignOut } from "../hooks/near"
import { WalletConnection } from "near-api-js"
import { useRouter } from "next/dist/client/router"
import Modal from "./modal";
import { AppContext, useAppContext } from '../context/state';

export default function HypeRegistrationButton() {
	const [modalOpen, setModalOpen] = useState(false)
	const [isConnected, setIsConnected] = useState(false)
	const [isRegistered, setIsRegistered] = useState(false)
	const [wallet, setWallet] = useState<WalletConnection | null>(null)
	const [hypeBalance, setHypeBalance] = useState<string | null>(null)
	const { state, stateModifier } = useAppContext()

	const router = useRouter()

	function openModal() {
		setModalOpen(true)
	}
	function closeModal() {
		setModalOpen(false)
	}
	async function handleWalletConnection() {
		if (!wallet) return
		walletSignIn(wallet)
	}

	function handleHypeRegistration() {
		if (!wallet?.isSignedIn()) return;
		registerToken(wallet)
	}

	function signOut() {
		if (!wallet?.isSignedIn()) return;
		router.replace(router.pathname)
		setIsConnected(false)
		walletSignOut(wallet)
	}

	useEffect(() => {
		const connectWallet = async () => {
			const _wallet = await getWalletConnection()
			if (!_wallet) return;
			setWallet(_wallet)
			// Set wallet on global state object, such that it can be
			// used in other components.
			stateModifier.setWallet(_wallet)
		}
		if (!wallet) {
			connectWallet()
		}
		//Sets isConnected true if wallet is signed in, false if not
		setIsConnected(!!wallet?.isSignedIn())

		const getBalance = async () => {
			if (!wallet) return
			const balance = await getHypeBalance(wallet)

			if (!balance || !getIsRegistered(wallet)) return;
			setHypeBalance(balance)
			setIsRegistered(true)
		}
		if (wallet?.isSignedIn()) {
			getBalance()
		}
	}, [])

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