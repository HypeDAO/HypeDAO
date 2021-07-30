import Image from "next/image"
import { useEffect, useState } from "react"
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/components/hype-registration-button.module.css'
import titlePlain from '../public/images/HypeDAO-plain.png'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import classNames from "classnames"
import { getHypeBalance, getWalletConnection, registerToken, walletSignIn, walletSignOut } from "../hooks/near"
import { WalletConnection } from "near-api-js"
import { useRouter } from "next/dist/client/router"

export default function HypeRegistrationButton() {
	const [modalOpen, setModalOpen] = useState(false)
	const [isConnected, setIsConnected] = useState(false)
	const [isRegistered, setIsRegistered] = useState(false)
	const [wallet, setWallet] = useState<WalletConnection | null>(null)
	const [hypeBalance, setHypeBalance] = useState<string | null>(null)

	const router = useRouter()

	function openModal() {
		setModalOpen(true)
		alert("this is a placeholder for a modal")
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
		}
		if (!wallet) {
			connectWallet()
		}
		//Sets isConnected true if wallet is signed in, false if not
		setIsConnected(!!wallet?.isSignedIn())

		const getBalance = async () => {
			if (!wallet) return
			const balance = await getHypeBalance(wallet)
			if (!balance) return;
			setHypeBalance(balance)
			setIsRegistered(true)
		}
		if (wallet?.isSignedIn()) {
			getBalance()
		}
	}, [wallet])

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
				<button className={classNames(utilStyles.noStyle, utilStyles.infoIcon, styles.signOutIcon,)} onClick={signOut}>
					<HighlightOffOutlinedIcon fontSize="small" />
				</button>
			)}


			{/* <div>
				explination of process in modal
			</div> */}
		</div>
	)
}