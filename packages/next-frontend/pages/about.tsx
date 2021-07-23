import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css"

export default function About() {
	return (
		<Layout>
			<main>
				<h1 className={utilStyles.title}>About HypeDAO</h1>
				<div className={utilStyles.scrim}>
					<h3 style={{ marginTop: "0" }}>We are an official artist guild on <a href="https://near.org/">NEAR Protocol</a></h3>
					<strong>Our mission:</strong>
					<ul>
						<li>To empower artists through tools and bounties</li>
						<li>To educate artists about how DAOs other tools can work for them</li>
						<li>To have fun and get people HYPED!!</li>
					</ul>

					<strong>Curious? Join us on <a href="https://t.me/hypedao" target="_blank" rel="noopener noreferrer">Telegram</a>!!!</strong>
				</div>
			</main>
		</Layout>
	)
}