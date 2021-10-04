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