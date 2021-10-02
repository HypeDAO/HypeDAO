import styles from '../../styles/components/form.module.css'

export enum FormStyle {
    Default,
    Wallet,
    DAO,
}

export enum FieldStyle {
    Row,
    Column
}

export const getFormStyle = (style: FormStyle): any => {
    switch (style) {
        case FormStyle.Wallet:
            return styles.formNarrowest
        case FormStyle.DAO:
            return styles.formNarrow
        default:
            return
    }
}