import classNames from "classnames";
import Layout from "../../components/layout";
import utilStyles from '../../styles/utils.module.css'
import styles from '../../styles/pages/Bounties.module.css'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { getTaigaTasks, TaskInterface } from "../../connections/taiga";
import { useEffect, useState } from "react";
import { useCallback } from "react";

export default function MonthlyBounties() {
	const [tasks, setTasks] = useState<TaskInterface[]>([])
	const [error, setError] = useState("")

	const sortTasks = useCallback((tasks: TaskInterface[]) => {
		const newTasks: TaskInterface[] = []
		const readyTasks: TaskInterface[] = []
		const progressTasks: TaskInterface[] = [];
		const testTasks: TaskInterface[] = []
		const doneTasks: TaskInterface[] = []
		tasks.forEach(task => {
			switch (task.status?.name) {
				case "New":
					newTasks.push(task)
					break;
				case "Ready":
					readyTasks.push(task)
					break;
				case "In progress":
					progressTasks.push(task)
					break;
				case "Ready for test":
					testTasks.push(task)
					break;
				case "Done":
					doneTasks.push(task)
					break;
			}
		})
		return [...newTasks, ...readyTasks, ...progressTasks, ...testTasks, ...doneTasks]
	}, [])

	useEffect(() => {
		const getTasks = async () => {
			const tasks = await getTaigaTasks()
			if (!tasks) {
				setError("Error getting bounties from Taiga Board")
			}
			else {
				const sortedTasks = sortTasks(tasks)
				setTasks(sortedTasks)
			}
		}
		getTasks()
	}, [sortTasks])

	const loadingMessage = error ? error : "...Loading"

	return (
		<Layout>
			<main>
				<h1 className={utilStyles.title}>Bounties</h1>
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
							link={task.link}
						/>)
					)}
					{!tasks.length
						? <h2 className={classNames({ [utilStyles.error]: error }, utilStyles.centerContent)}>{loadingMessage}</h2>
						: null}
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
	status?: TaskInterface["status"];
	link?: string
}
function GridCell({ title, amount, isHeader, isClaimed, claimedText, status, link }: GridCellProps) {
	const getIcon = () => {
		switch (status?.name) {
			case "New": return <RadioButtonUncheckedIcon style={{ color: status?.color }} />;
			case "Ready":
			case "In progress":
			case "Ready for test": return <MoreHorizIcon style={{ color: status?.color }} />;
			case "Done": return <DoneOutlineIcon style={{ color: status?.color }} />
		}
	}
	return (
		<li className={classNames(styles.gridCell, { [styles.gridHeader]: isHeader })}>
			{claimedText
				? <p>{claimedText}</p>
				: <div className={utilStyles.centerContent}>
					{getIcon()}
				</div>
			}
			<a href={link} target="_blank" rel="noopener noreferrer"><p>{title}</p></a>
			<p>{amount}</p>
		</li >
	)
}