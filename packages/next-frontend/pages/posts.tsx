import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css"
import DiscoursePost from '../components/discourse'
import { Table } from '@material-ui/core'

export default function Posts() {
	return (
		<Layout>
			<main>
				<h1 className={utilStyles.title}>Discourse Integration Demo</h1>
				<div className={utilStyles.scrim}>
					<h2 style={{ marginTop: "0" }}>Solution highlights</h2>

					<p>Used discourse <a href="https://docs.discourse.org/openapi.json" target="_blank" rel="noreferrer">Open API spec</a> to generate a React Component &lt;GetPost&gt; using the following command: </p>
					
					<p>./node_modules/.bin/restful-react import --file ../resources/discourse-openapi-spec-edited.json --output ./components/discourse-client.tsx</p>
				<Table>
					<tbody>
					<tr>
						<td><DiscoursePost postId="14215"/></td>
					</tr>
					<tr>
						<td><DiscoursePost postId="14212"/></td>
					</tr>
					<tr>
						<td><DiscoursePost postId="1999"/></td>
					</tr>
					<tr>
						<td><DiscoursePost postId="2001"/></td>
					</tr>
					</tbody>
				</Table>

				</div>
			</main>
		</Layout>
	)
}
