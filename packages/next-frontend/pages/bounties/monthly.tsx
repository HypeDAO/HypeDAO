import classNames from "classnames";
import Layout from "../../components/layout";
import utilStyles from '../../styles/utils.module.css'
import styles from '../../styles/pages/Bounties.module.css'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useEffect, useState } from "react";
import { useCallback } from "react";


//We are depricating the Taiga board and for now this page. I am keeping it around just incase we want to bring it back with a different management system

export default function MonthlyBounties() {
	return (
		<Layout>
			<h1 className={utilStyles.title}>404</h1>
			<h3 className={utilStyles.infoText}>Sorry, this page no longer exists!</h3>
			{/* <main>
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
			</main> */}
		</Layout>
	)
}

interface GridCellProps {
	title: string;
	amount: string;
	isHeader?: boolean;
	isClaimed?: boolean;
	claimedText?: string;
	link?: string
}
function GridCell({ title, amount, isHeader, isClaimed, claimedText, link }: GridCellProps) {
	// const getIcon = () => {
	// 	switch (status?.name) {
	// 		case "New": return <RadioButtonUncheckedIcon style={{ color: status?.color }} />;
	// 		case "Ready":
	// 		case "In progress":
	// 		case "Ready for test": return <MoreHorizIcon style={{ color: status?.color }} />;
	// 		case "Done": return <DoneOutlineIcon style={{ color: status?.color }} />
	// 	}
	// }
	return (
		<li className={classNames(styles.gridCell, { [styles.gridHeader]: isHeader })}>
			{claimedText
				? <p>{claimedText}</p>
				: <div className={utilStyles.centerContent}>
					{/* {getIcon()} */}
				</div>
			}
			<a href={link} target="_blank" rel="noopener noreferrer"><p>{title}</p></a>
			<p>{amount}</p>
		</li >
	)
}