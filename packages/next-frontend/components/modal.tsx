import classNames from "classnames";
import CancelIcon from '@material-ui/icons/Cancel';
import utilStyles from '../styles/utils.module.css'

interface ModalProps {
	children: React.ReactNode;
	isOpen: boolean;
	closeModal: () => void
}

export default function Modal({ children, isOpen, closeModal }: ModalProps) {
	return (
		<div className={classNames(isOpen)}>
			<button className={utilStyles.noStyle} onClick={closeModal}>
				<CancelIcon />
			</button>
			<div>
				{children}
			</div>
		</div>
	)
}