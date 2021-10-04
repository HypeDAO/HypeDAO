import '../styles/globals.css'
import styles from '../styles/components/layout.module.css'
import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import starsImage from "../public/images/stars.webp"
import MainNavigation from '../components/main-navigation'
import Footer from '../components/footer'
import useWindowDimensions from '../hooks/windowDimensions'
import { StateProvider } from '../context/state'

function MyApp({ Component, pageProps }: AppProps) {
	const [isLoaded, setIsLoaded] = useState(false);

	const { height } = useWindowDimensions()

	useEffect(() => {
		//using the inner height as "vh" in order to determine mobiles true height inside all the controls
		const vh = height * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}, [height])

	return (
		<>
		<StateProvider>
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
		</StateProvider>
		</>
	)
}
export default MyApp
