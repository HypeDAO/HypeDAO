import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css"

export default function About() {
	return (
		<Layout>
			<main>
				<h1 className={utilStyles.title}>About HypeDAO</h1>
				<p>Here is some text about HypeDAO</p>
			</main>
		</Layout>
	)
}