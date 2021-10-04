import classNames from "classnames";
import styles from '../../styles/components/form.module.css'

export enum InputType {
    Select,
    Text,
    Number
}

interface FieldsProps {
    children: React.ReactNode;
}

export function Fields({ children }: FieldsProps) {
    return (
        <div className={classNames(styles.form)}>
            { children }
        </div>
    )
}