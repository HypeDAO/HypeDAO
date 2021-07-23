import Head from "next/head";
import Link from "next/link";
import styles from '../styles/layout.module.css'
import MainNavigation from "./main-navigation";

interface LayoutProps {
	children: React.ReactNode;
	metaDataTitle?: string
	//Pass these props in to Layout component <Layout noFooter>...</Layout> if you want customized versions on a specific page.
	noNav?: boolean;
	noFooter?: boolean;
}

export default function Layout({
	children,
	metaDataTitle = "HypeDAO",
	noNav = false,
	noFooter = false,
}: LayoutProps) {

	return (
		<div className={styles.container}>

			<Head>
				<title>{metaDataTitle}</title>
				<meta name="description" content="Made by artists for artists" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{!noNav && <MainNavigation />}

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