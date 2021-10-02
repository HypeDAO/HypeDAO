import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css"
import DiscoursePost from '../components/discourse'
import { Table } from '@material-ui/core'

export default function Posts() {
	return (
		<Layout>
			<main>
				<h1 className={utilStyles.title}>Forum Highlights</h1>
				<Table>
					<tbody>
					<tr>
						<td><DiscoursePost postId="14993"/></td>
					</tr>
					<tr>
						<td><DiscoursePost postId="13287"/></td>
					</tr>
					<tr>
						<td><DiscoursePost postId="13495"/></td>
					</tr>
					</tbody>
				</Table>
			</main>
		</Layout>
	)
}
