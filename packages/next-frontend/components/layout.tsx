import classNames from "classnames";
import Head from "next/head";
import styles from '../styles/components/layout.module.css'

interface LayoutProps {
	children: React.ReactNode;
	metaDataTitle?: string;
	withScrim?: boolean
}

export default function Layout({
	children,
	metaDataTitle = "HypeDAO",
	withScrim
}: LayoutProps) {

	return (
		<div className={classNames(styles.container, { [styles.withScrim]: withScrim })}>
			<Head>
				<title>{metaDataTitle}</title>
				<meta name="description" content="Made by artists for artists" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{children}

		</div>
	)
}