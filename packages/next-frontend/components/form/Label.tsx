import classNames from "classnames";
import utilStyles from '../../styles/utils.module.css'
import styles from '../../styles/components/form.module.css';

interface LabelProps {
    text: string;
    light: boolean;
}

export function Label({text, light}: LabelProps) {
    return (
        <p className={classNames(
            utilStyles.scrim,
            styles.scrim,
            styles.scrimThin,
            light ? utilStyles.scrimLight : null)}
        >
            {text}
        </p>
    )
}

interface FormattedLabelProps {
    left: string;
    right: string;
    light: boolean;
    small?: boolean;
    padded?: boolean;
}

export function FormattedLabel({ left, right, light, small, padded }: FormattedLabelProps) {
    return (
        <div className={classNames(
            utilStyles.scrim,
            styles.scrim,
            padded? styles.scrimPadded : null,
            light ? utilStyles.scrimLight : null,
            small ? utilStyles.smallText : null)}
        >
            <p className={styles.left}>{left}</p>
            <p className={styles.right}>{right}</p>
        </div>
	)
}

interface ContainerLabelProps {
    content: React.ReactNode;
    light: boolean;
}

export function ContainerLabel({content, light}: ContainerLabelProps) {
    return (
        <div className={classNames(
            utilStyles.scrim,
            styles.scrim,
            styles.scrimThin,
            utilStyles.flexGrowFill,
            light ? utilStyles.scrimLight : null)}
        >
            {content}
        </div>
    )
}