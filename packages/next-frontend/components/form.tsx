import classNames from "classnames";
import utilStyles from '../styles/utils.module.css'
import styles from '../styles/components/form.module.css';

interface FormInputProps {
	value: string;
    placeholder: string;
    type: string;
    onChange: (event: any) => void;
	onKeyDown: (event: any) => void;
    valid: boolean;
}

export function FormInput({ value, placeholder, type, onChange, onKeyDown, valid }: FormInputProps) {
	return (
        <div>
            <input
                className={classNames(utilStyles.textinput)}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown} 
                autoFocus
            />
            {!valid && (
                <p className={classNames(utilStyles.scrimLight, styles.scrim, styles.scrimThin)}>The account ID must include a Top Level Account such as <b>.near</b> or contain exactly 64 characters.</p>
            )}
        </div>
		
	)
}

interface LabelProps {
    text: string;
}

export function Label({text}: LabelProps) {
    return (
        <p className={classNames(utilStyles.scrimLight, styles.scrim, styles.scrimThin)}>
            {text}
        </p>
    )
}

interface FormattedLabelProps {
    left: string;
    right: string;
    light: boolean;
}

export function FormattedLabel({ left, right, light }: FormattedLabelProps) {
	return (
        <div className={classNames(utilStyles.scrim, styles.scrim, light ? utilStyles.scrimLight : null)}>
            <p className={styles.left}>{left}</p>
            <p className={styles.right}>{right}</p>
        </div>
	)
}

interface ActiveButtonProps {
    text: string;
    enabled: boolean;
    onClick: () => void;
}

export function ActiveButton({text, enabled, onClick}: ActiveButtonProps) {
    return (
        <button
            className={classNames(utilStyles.primaryButton, styles.primaryButton)}
            disabled={!enabled}
            onClick={onClick}>{text}</button>
    )
}