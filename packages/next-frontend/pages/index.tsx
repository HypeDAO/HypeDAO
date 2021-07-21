import Image from 'next/image'
import styles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css'
import gridImage from "../public/images/swirly-hazy-grid.png"
import Layout from '../components/layout'

export default function Home() {
	return (
		<Layout>
			<main>
				<h1 className={utilStyles.titleXl}>HypeDAO</h1>
				<div className={styles.gridImageBg}>
					<Image
						src={gridImage}
						alt=""
						layout="fill"
						objectFit="cover"
						quality={100}
					/>
				</div>
			</main>
		</Layout>
	)
}
