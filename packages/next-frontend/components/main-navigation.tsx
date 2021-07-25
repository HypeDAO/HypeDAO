import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toggleIcon from '../public/images/menu-icon.webp'
import styles from '../styles/components/main-navigation.module.css'
import utilStyles from '../styles/utils.module.css'
import classNames from "classnames";

export const PATHNAMES = {
	HOME: "/",
	ABOUT: "/about",
	BOUNTIES: {
		FOUNDATIONAL: "/bounties/foundation"
	}
}

export default function MainNavigation() {
	const [isVisible, setIsVisible] = useState(true)

	const { pathname } = useRouter()

	useEffect(() => {
		if (window.screen?.width <= 480) {
			setIsVisible(false)
		}
	}, [pathname])

	function handleToggle() {
		setIsVisible(prev => !prev)
	}

	return (
		<>
			<button className={styles.toggleIcon} onClick={handleToggle}>
				<Image src={toggleIcon} alt="" />
			</button>
			<nav className={classNames(styles.container, { [styles.navActive]: isVisible })}>
				<h3 className={classNames(utilStyles.titleSm, styles.navTitle)}>HypeDAO</h3>
				<div className={styles.linksContainer}>
					<Link href={PATHNAMES.HOME}>
						<a className={classNames(styles.link, { [styles.selected]: pathname === PATHNAMES.HOME })}>Home</a>
					</Link>
					<Link href={PATHNAMES.ABOUT}>
						<a className={classNames(styles.link, { [styles.selected]: pathname === PATHNAMES.ABOUT })}>About</a>
					</Link>
					<Link href={PATHNAMES.BOUNTIES.FOUNDATIONAL}>
						<a className={classNames(styles.link, { [styles.selected]: pathname === PATHNAMES.BOUNTIES.FOUNDATIONAL })}>Bounties</a>
					</Link>
				</div>
			</nav>
		</>
	)
}