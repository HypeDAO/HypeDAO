import Image from 'next/image'
import TwitterIcon from '@material-ui/icons/Twitter';
import TelegramIcon from '@material-ui/icons/Telegram';
import InstagramIcon from '@material-ui/icons/Instagram';
import MediumIcon from '../public/images/medium.svg'

import styles from '../styles/components/footer.module.css'
export default function Footer() {
	return (
		<footer className={styles.footerContainer}>
			<p className={styles.copyright}>&#169; {new Date().getFullYear()} HypeDAO</p>
			<div className={styles.socials}>
				<a href="https://twitter.com/HypeDAO" target="_blank" rel="noopener noreferrer">
					<TwitterIcon />
				</a>
				<a href="https://t.me/hypedao" target="_blank" rel="noopener noreferrer">
					<TelegramIcon />
				</a>
				<a href="https://medium.com/hypedao" target="_blank" rel="noopener noreferrer">
					<MediumIcon />
				</a>
				<a href="https://www.instagram.com/hypedao/" target="_blank" rel="noopener noreferrer">
					<InstagramIcon />
				</a>
			</div>
		</footer>
	)
}