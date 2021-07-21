import Layout from "../../components/layout";
import utilStyles from '../../styles/utils.module.css'

export default function FoundationalBounties() {
	return (
		<Layout>
			<main>
				<h1 className={utilStyles.title}>Foundational Bounties</h1>
				<ul>
					<li>bounty 1</li>
					<li>bounty 2</li>
				</ul>
			</main>
		</Layout>
	)
}