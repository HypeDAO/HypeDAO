import classNames from "classnames";
import styles from '../styles/components/hype-menu.module.css';
import Link from "next/link";

interface HypeMenuProps {
	balance: number;
	isOpen: boolean;
	onSignOut: () => void;
}

export default function HypeMenu({ balance, isOpen, onSignOut }: HypeMenuProps) {
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
				<Link href={'/proposals'}>
					<a className={styles.link}>Proposals</a>
				</Link>
			</li>
			<li className={styles.divider}>
				<Link href={'/token/send'}>
					<a className={styles.link}>Send</a>
				</Link>
			</li>
			<li>
				<Link href={'/'}>
					<a className={styles.link} onClick={onSignOut}>Sign Out</a>
				</Link>
			</li>
		</ul>
	)
}