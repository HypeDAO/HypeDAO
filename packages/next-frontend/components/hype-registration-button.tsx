import Image from "next/image"
import { useState } from "react"
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/components/hype-registration-button.module.css'
import titlePlain from '../public/images/HypeDAO-plain.png'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import classNames from "classnames"

export default function HypeRegistrationButton() {
	const [modalOpen, setModalOpen] = useState(false)
	const [isConnected, setIsConnected] = useState(false)
	const [isRegistered, setIsRegistered] = useState(false)

	function openModal() {
		setModalOpen(true)
		alert("this is a placeholder for a modal")
	}
	function closeModal() {
		setModalOpen(false)
	}
	function handleWalletConnection() {
		//logic for connecting the wallet
		setIsConnected(true)
	}
	function handleHypeRegistration() {
		//logic for registration
		setIsRegistered(true)
	}
	return (
		<div className={styles.registerButtonContainer}>
			{!isConnected && (
				<button
					className={utilStyles.secondaryButton}
					onClick={handleWalletConnection}
				>
					Connect Wallet
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
				//I'm thinking this will eventual be a logo or some text that says like "Congrats"
				//possibly you would pass in the final state as a prop depending on where this component is used
				<Image src={titlePlain} alt="HypeDAO" width={200} height={40} />
			)}

			{(!isConnected || !isRegistered) && (
				<button className={classNames(utilStyles.noStyle, styles.infoIcon)} onClick={openModal}>
					<InfoOutlinedIcon fontSize="small" />
				</button>
			)}


			{/* <div>
				explination of process in modal
			</div> */}
		</div>
	)
}