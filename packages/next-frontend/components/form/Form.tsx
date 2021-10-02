import classNames from "classnames";
import utilStyles from '../../styles/utils.module.css'
import styles from '../../styles/components/form.module.css'

import React from "react";
import { Form as FormikForm, Formik } from 'formik';
import { FormStyle, getFormStyle } from './utils'

interface FormProps {
    children: React.ReactNode;
    initialValues: any;
    style?: FormStyle;
    onSubmit: (values: any, bag: any) => Promise<any>;
}

export function Form({ children, initialValues, style, onSubmit }: FormProps) {

    const formStyle = style? getFormStyle(style) : null

    const handleSubmit = async (values: any, bag: any) => {
        return onSubmit(values, bag);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {formik => (
                <FormikForm className={formStyle}>
                    {children}
                    <div className={classNames(styles.form, formStyle)}>
                        <div>
                            <button
                                className={classNames(utilStyles.primaryButton, styles.primaryButton)}
                                disabled={formik.isSubmitting}
                                type="submit"
                            >
                                {'Submit'}
                            </button>
                        </div>
                    </div>
                </FormikForm>
            )}
        </Formik>
    )
}