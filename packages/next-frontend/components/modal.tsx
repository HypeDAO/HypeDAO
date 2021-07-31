import classNames from "classnames";
import CancelIcon from '@material-ui/icons/Cancel';
import utilStyles from '../styles/utils.module.css';
import styles from '../styles/components/modal.module.css';

interface ModalProps {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	title?: string;
}

export default function Modal({ children, title, isOpen, onClose }: ModalProps) {
	return (
		<div className={classNames({ [styles.isOpen]: isOpen }, styles.wrapper)} onClick={() => onClose()}>
			<div className={classNames(styles.body)} onClick={e => e.stopPropagation()}>
				<button className={classNames(utilStyles.noStyle, styles.cancel)} onClick={onClose}>
					<CancelIcon />
				</button>
				{children}
			</div>
		</div>
	)
}