import Head from "next/head";
import styles from '../styles/components/layout.module.css'

interface LayoutProps {
	children: React.ReactNode;
	metaDataTitle?: string
}

export default function Layout({
	children,
	metaDataTitle = "HypeDAO",
}: LayoutProps) {

	return (
		<div className={styles.container}>

			<Head>
				<title>{metaDataTitle}</title>
				<meta name="description" content="Made by artists for artists" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{children}

			{/* {!noFooter && (
				<footer className={styles.footer}>
					<p>footer stuff</p>
					<Link href="/">
						<a>HypeDAO</a>
					</Link>
				</footer>
			)} */}
		</div>
	)
}