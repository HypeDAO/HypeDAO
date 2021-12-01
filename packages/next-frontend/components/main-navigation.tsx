import { useRouter } from "next/dist/client/router";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toggleIcon from '../public/images/menu-icon.webp'
import styles from '../styles/components/main-navigation.module.css'
import classNames from "classnames";
import HypeRegistrationButton from "./hype-registration-button";

export const PATHNAMES = {
	HOME: "/",
	ABOUT: "/about",
	ARTISTS: "/artists"
	// POSTS: "/posts", //Our permisions seem to have been taken away by the Near.gov folks, trying to get them back but taking out access to this route until then
}

export default function MainNavigation() {
	const [isVisible, setIsVisible] = useState(true)

	const { pathname } = useRouter()


	useEffect(() => {
		if (window.screen?.width <= 480) {
			setIsVisible(false)
		}
	}, [pathname])

	useEffect(() => {
		// if touch scrolling and not at the top of the window remove menu
		const handleMove = () => {
			const top = window.screen?.availHeight ? window.screen.height - window.screen.availHeight : 0
			const isAtTop = window.pageYOffset === top
			setIsVisible(isAtTop)
		}
		window.addEventListener("touchmove", handleMove)

		return () => {
			window.removeEventListener("touchmove", handleMove)
		}
	}, [])

	function handleToggle() {
		setIsVisible(prev => !prev)
	}

	return (
		<>
			<button className={classNames(styles.toggleIcon, { [styles.pulse]: !isVisible })} onClick={handleToggle}>
				<Image src={toggleIcon} alt="" />
			</button>
			<nav className={classNames(styles.container, { [styles.navActive]: isVisible })}>

				<HypeRegistrationButton />

				<div className={styles.linksContainer}>
					<Link href={PATHNAMES.HOME}>
						<a className={classNames(styles.link, { [styles.selected]: pathname === PATHNAMES.HOME })}>Home</a>
					</Link>
					<Link href={PATHNAMES.ABOUT}>
						<a className={classNames(styles.link, { [styles.selected]: pathname === PATHNAMES.ABOUT })}>About</a>
					</Link>
					<Link href={PATHNAMES.ARTISTS}>
						<a className={classNames(styles.link, { [styles.selected]: pathname === PATHNAMES.ARTISTS })}>Artists</a>
					</Link>
					{/* <Link href={PATHNAMES.POSTS}>
						<a className={classNames(styles.link, { [styles.selected]: pathname === PATHNAMES.POSTS })}>Posts</a>
					</Link> */}
				</div>
			</nav>
		</>
	)
}