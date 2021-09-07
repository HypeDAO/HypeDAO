import React, { useEffect, useState, useRef } from "react"
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/components/hype-registration-button.module.css'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import classNames from "classnames"
import { requestHypeBalance, getIsRegistered, getWalletConnection, registerToken, walletSignIn, walletSignOut } from "../hooks/near"
import { useRouter } from "next/dist/client/router"
import Modal from "./modal";
import Menu from "./hype-menu";
import { ApplicationContext } from '../context/state';

export default function HypeRegistrationButton() {
	const [modalOpen, setModalOpen] = useState(false)
	const [hypeMenuOpen, setHypeMenuOpen] = useState(false)
	const [isConnected, setIsConnected] = useState(false)
	const [isRegistered, setIsRegistered] = useState(false)
	const [hypeBalance, setHypeBalance] = useState(0)
	const {state, dispatch} = React.useContext(ApplicationContext)

	const router = useRouter()
	const menuRef = useRef(null)


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

	function toggleHypeMenu() {
		setHypeMenuOpen(!hypeMenuOpen)
	}

	function closeHypeMenu() {
		setHypeMenuOpen(false)
	}

	const handleClose = (event: any) => {
		for (let element of event.path) {
			if (menuRef.current === element) return;
		}
		closeHypeMenu()
	}

	useEffect(() => {
		if (hypeMenuOpen) {
			window.addEventListener('click', handleClose);
		}
		return () => window.removeEventListener('click', handleClose);
	}, [hypeMenuOpen])

	useEffect(() => {
		//Sets isConnected true if wallet is signed in, false if not
		setIsConnected(!!state.wallet?.isSignedIn())

		const getBalance = async () => {
			const wallet = state.wallet
			if (!wallet) return
			const account = wallet.account();
			const accountInfo = await requestHypeBalance(wallet, account.accountId)
			if (!accountInfo || !getIsRegistered(wallet)) return;
			setHypeBalance(accountInfo.balance)
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
				<button className={classNames(utilStyles.primaryButton, styles.accountButton)}
					onClick={toggleHypeMenu}
				>
					{state.wallet?.account().accountId}
				</button>
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

			<Menu 
				balance={hypeBalance}
				isOpen={hypeMenuOpen}
			/>

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