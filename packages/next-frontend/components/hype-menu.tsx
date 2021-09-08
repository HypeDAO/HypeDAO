import classNames from "classnames";
import styles from '../styles/components/hype-menu.module.css';
import Link from "next/link";

interface HypeMenuProps {
	balance: number;
	isOpen: boolean;
}

export default function HypeMenu({ balance, isOpen }: HypeMenuProps) {
	return (
		<ul className={classNames({ [styles.isOpen]: isOpen }, styles.hypeMenu)}>
			<li className={styles.divider}> 
				<div className={styles.link}>
					$HYPE: {balance.toFixed(2)}
				</div>
			</li>
			<li> 
				<Link href={'/token/board'}>
					<a className={styles.link}>Leaderboard</a>
				</Link>
			</li>
			<li>
				<Link href={'/token/send'}> 
					<a className={styles.link}>Send</a>
				</Link>
			</li>
			
		</ul>
	)
}