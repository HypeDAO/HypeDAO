import '../styles/globals.css'
import styles from '../styles/components/layout.module.css'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import starsImage from "../public/images/stars.webp"
import MainNavigation from '../components/main-navigation'
import Footer from '../components/footer'
import useWindowDimensions from '../hooks/windowDimensions'
import { AppContext, useAppState } from '../context/state';

function MyApp({ Component, pageProps }: AppProps) {
	const [isLoaded, setIsLoaded] = useState(false);
	const { state, stateModifier } = useAppState()

	const { height } = useWindowDimensions()

	useEffect(() => {
		//using the inner height as "vh" in order to determine mobiles true height inside all the controls
		const vh = height * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}, [height])

	// Wrap components in a AppContext.Provider. This makes it possible to use the useAppContext() hook in child components.
	return (
		<>
		<AppContext.Provider value={{ state, stateModifier }}>
			<MainNavigation />
			<Component
				{...pageProps}
				bgIsLoaded={isLoaded}
			/>
			<div className={classNames(styles.starsImageBg, { [styles.imageLoaded]: isLoaded })}>
				<Image
					src={starsImage}
					alt=""
					layout="fill"
					objectFit="cover"
					quality={100}
					onLoad={() => setIsLoaded(true)}
				/>
			</div>
			<Footer />
		</AppContext.Provider>
			
		</>
	)
}
export default MyApp
