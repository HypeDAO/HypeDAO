import Image from 'next/image'
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/pages/Home.module.css'
import gridImage from "../public/images/swirly-hazy-grid.webp"
import Layout from '../components/layout'
import classNames from 'classnames'
import { useState } from 'react'
import Waves from '../components/waves'
import titleColor from '../public/images/HypeDAO-color.png'
import titlePlain from '../public/images/HypeDAO-plain.png'

interface HomeProps {
	bgIsLoaded: boolean;
}
export default function Home({ bgIsLoaded }: HomeProps) {
	const [wavesOn, setWavesOn] = useState(false)

	const toggleWaves = () => setWavesOn(prev => !prev)
	const wavesBgColor = "rgba(0, 0, 0, 0.05)"
	return (
		<Layout >
			<main className={styles.homeContainer}>
				<button className={classNames(styles.homeTitle, utilStyles.noStyle, utilStyles.titleXl)} onClick={toggleWaves}>
					<div className={classNames(styles.titleColor, { [styles.isActive]: wavesOn })} >
						<Image src={titleColor} alt="" />
					</div>
					<div className={classNames(styles.titlePlain, { [styles.isActive]: wavesOn })}>
						<Image src={titlePlain} alt="HypeDAO" />
					</div>
				</button>
				{/* Placeholder/example */}
				{/* <button className={utilStyles.primaryButton}>
					Register Here
				</button> */}
				{/* <h1 className={classNames(utilStyles.titleXl, styles.homepageTitle)} onClick={toggleWaves}>HypeDAO</h1> */}
				<div className={classNames(styles.gridImageBg, { [styles.imageLoaded]: bgIsLoaded })}>
					<Image
						src={gridImage}
						alt=""
						layout="fill"
						objectFit="cover"
						quality={100}
					/>
				</div>
			</main>
			{wavesOn ? <Waves color={wavesBgColor} /> : null}
		</Layout>
	)
}
