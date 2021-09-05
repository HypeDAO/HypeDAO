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

					<p>This is second attempt to deliver Discourse integration functionality. No Open API used this time. Everything is super simple: HTTP GET request is done via Axios, response is put to component internal state and then rendered.</p>
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
