import classNames from "classnames";
import utilStyles from '../../styles/utils.module.css'
import styles from '../../styles/components/form.module.css'

import { Form as FormikForm, Formik } from 'formik';
import { FormStyle, getFormStyle } from "./utils";
import React, { useState } from "react";
import Link from "next/link";


interface FormWizardProps {
    children: React.ReactNode;
    initialValues: any;
    style?: FormStyle;
    onSubmit: (values: any, bag: any) => Promise<any>;
}

export function FormWizard({ children, initialValues, style, onSubmit }: FormWizardProps) {
    const formStyle = style ? getFormStyle(style) : null
    
    const [formNumber, setFormNumber] = useState(0);
    const forms = React.Children.toArray(children);
    const [snapshot, setSnapshot] = useState(initialValues);

    const form = forms[formNumber];
    const totalForms = forms.length;
    const isLastForm = formNumber === totalForms - 1;

    const next = (values: any) => {
        setSnapshot(values);
        setFormNumber(Math.min(formNumber + 1, totalForms - 1));
    }

    const back = (values: any) => {
        setSnapshot(values);
        setFormNumber(Math.max(formNumber - 1, 0));
    }

    const handleSubmit = async (values: any, bag: any) => {
        if (isLastForm) {
          return onSubmit(values, bag);
        } else {
          bag.setTouched({});
          next(values);
        }
      };

    return (
        <Formik
            initialValues={snapshot}
            onSubmit={handleSubmit}
            >
            {formik => (
                <FormikForm className={formStyle}>
                    {form}
                    <div>
                        <button
                            className={classNames(utilStyles.primaryButton, styles.primaryButton)}
                            disabled={formik.isSubmitting}
                            type="submit"
                        >
                            {isLastForm ? 'Submit' : 'Continue'}
                        </button>
                    </div>

                    {formNumber > 0 && (
                        <div>
                            <Link href={''}>
                                <a
                                    className={classNames(utilStyles.centerContent, utilStyles.formLink)}
                                    onClick={() => back(formik.values)}
                                >
                                    Back
                                </a>
                            </Link>
                        </div>
                    )}
                </FormikForm>
            )}
        </Formik>
	)
}