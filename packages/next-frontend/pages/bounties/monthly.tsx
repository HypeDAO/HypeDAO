import classNames from "classnames";
import Layout from "../../components/layout";
import utilStyles from '../../styles/utils.module.css'
import styles from '../../styles/pages/Bounties.module.css'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { getTaigaTasks, taskInterface } from "../../connections/taiga";
import { useEffect, useState } from "react";

export default function MonthlyBounties() {
	const [tasks, setTasks] = useState<taskInterface[]>([])

	useEffect(() => {
		const getTasks = async () => {
			const tasks = await getTaigaTasks()
			setTasks(tasks)
		}
		getTasks()
	}, [])

	return (
		<Layout>
			<main>
				<h1 className={utilStyles.title}>Monthly Bounties</h1>
				<h3 className={utilStyles.infoText}>Wanna claim a bounty? Lets get in touch via <a href="https://t.me/hypedao" target="_blank" rel="noopener noreferrer">Telegram</a>!</h3>
				<ul className={utilStyles.scrim}>
					<GridCell
						title="Bounty Title"
						amount="Bounty Amount"
						isHeader
						claimedText="Status"
					/>
					{tasks.map((task, i) => (
						<GridCell
							key={task.title + i}
							title={task.title}
							amount={task.bounty}
							status={task.status}
							claimedText={task.status?.name}
						/>)
					)}
					{/*<GridCell
						title="Start work on a $HYPE tipbot for telegram"
						amount="100N"
					/>
					<GridCell
						title="Write an introductory article about Hypedao, listing bounties available"
						amount="75N"
						isClaimed
					/>
					<GridCell
						title="Put together a taskboard"
						amount="50N"
					/>
					<GridCell
						title="Manage Twitter @hypedao with daily engagement tweets, prompts, etc"
						amount="100N split 3 ways"
						isClaimed
					/>
					<GridCell
						title="Logo Design Bounty! 10 Prototypes accepted! One chosen for finalization"
						amount="5N per submission, 50N for Final"
					/>
					<GridCell
						title="Host Twitter Spaces or Clubhouse in order to talk about HypeDAO and onboard people."
						amount="100N to be split among hosts across July"
					/>
					<GridCell
						title="Contribute good campaign ideas in Telegram chat"
						amount="0.1-5N each, 70N total"
					/>
					<GridCell
						title="Hype Campaign participation"
						amount="1-5 N, 100N total"
					/> */}
				</ul>
			</main>
		</Layout>
	)
}

interface GridCellProps {
	title: string;
	amount: string;
	isHeader?: boolean;
	isClaimed?: boolean;
	claimedText?: string;
	status?: taskInterface["status"]
}
function GridCell({ title, amount, isHeader, isClaimed, claimedText, status }: GridCellProps) {
	return (
		<li className={classNames(styles.gridCell, { [styles.gridHeader]: isHeader })}>
			{claimedText
				? <p style={{ color: status?.color }}>{claimedText}</p>
				: <div className={utilStyles.centerContent}>
					{isClaimed ? <DoneOutlineIcon /> : null}
				</div>
			}
			<p>{title}</p>
			<p>{amount}</p>
		</li>
	)
}