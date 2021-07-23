import '../styles/globals.css'
import styles from '../styles/layout.module.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import classNames from 'classnames'
import Image from 'next/image'
import starsImage from "../public/images/stars.webp"

function MyApp({ Component, pageProps }: AppProps) {
	const [isLoaded, setIsLoaded] = useState(false)
	return (
		<>
			<Component {...pageProps} bgIsLoaded={isLoaded} />
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
		</>
	)
}
export default MyApp
