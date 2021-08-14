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
import logo from '../public/images/HYPEDAO-logo-image.png'
import { useEffect } from 'react'
import dynamic from "next/dynamic"
import useWindowDimensions from '../hooks/windowDimensions'


interface HomeProps {
	bgIsLoaded: boolean;
	// height: number;
}
export default function Home({ bgIsLoaded }: HomeProps) {
	const [wavesOn, setWavesOn] = useState(false)

	const { height } = useWindowDimensions()

	useEffect(() => {
		//setting the inner height to determine mobiles true height inside all the controls
		const vh = height * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}, [height])

	const toggleWaves = () => setWavesOn(prev => !prev)

	const wavesBgColor = "rgba(0, 0, 0, 0.05)"

	return (
		<Layout >
			<main className={styles.homeContainer}>

				<button className={classNames(styles.homeTitle, utilStyles.noStyle, utilStyles.titleXl, { [styles.imageLoaded]: bgIsLoaded })} onClick={toggleWaves}>
					<div className={classNames(styles.titleColor, { [styles.isActive]: wavesOn, [styles.imageLoaded]: bgIsLoaded })} >
						<Image src={titleColor} alt="" />
					</div>
					<div className={classNames(styles.titlePlain, { [styles.isActive]: wavesOn })}>
						<Image src={titlePlain} alt="HypeDAO" />
					</div>
					<div className={classNames(styles.logo, { [styles.isActive]: wavesOn })}>
						<Image
							src={logo}
							alt=""
						/>
					</div>

				</button>

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
