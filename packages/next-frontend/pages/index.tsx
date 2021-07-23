import Image from 'next/image'
import styles from '../styles/Home.module.css'
import utilStyles from '../styles/utils.module.css'
import gridImage from "../public/images/swirly-hazy-grid.webp"
import Layout from '../components/layout'
import classNames from 'classnames'

interface HomeProps {
	bgIsLoaded: boolean
}
export default function Home({ bgIsLoaded }: HomeProps) {
	return (
		<Layout>
			<main>
				<h1 className={utilStyles.titleXl} style={{ marginTop: "20rem" }}>HypeDAO</h1>
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
		</Layout>
	)
}
