import classNames from "classnames";
import utilStyles from '../../styles/utils.module.css'
import formStyles from '../../styles/components/form.module.css'

import { ErrorMessage, Field } from 'formik';
import { InputType } from "./Fields";
import { FieldStyle } from "./utils";

export interface Options {
    label: string;
    value: string;
}

interface LabeledFieldProps {
    type: InputType;
    name: string;
    label?: string;
    placeholder: string;
    style?: FieldStyle;
    disabled?: boolean;
    options?: Options[];
    validate: (value: any) => any | Promise<any>;
}

export function LabeledField({ type, name, label, placeholder, style, disabled, options, validate }: LabeledFieldProps) {
    
    const fieldStyle = (style == FieldStyle.Row) ? formStyles.formFieldRow : null

    return (
        <div className={classNames(fieldStyle)}>
            {label && (
                <label htmlFor={name}>{label}</label>
            )}
            {type == InputType.Text && (
                <Field
                    autoComplete={name}
                    component="input"
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    type="text"
                    validate={validate}
                    disabled={disabled ? true : false }
                />
            )}
            {type == InputType.Number && (
                <Field
                    autoComplete={name}
                    component="input"
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    type="number"
                    validate={validate}
                    disabled={disabled ? true : false }
                />
            )}
            {type == InputType.Select && (
                <Field
                    id={name}
                    name={name}
                    as="select"
                    disabled={disabled ? true : false }
                >
                    {options?.map((option, i) => (
						<option 
                            key={'select-option-' + i}
                            value={option.value}
                        >
                            {option.label}
                        </option>)
					)}
                </Field>
            )}
            <ErrorMessage
                className={classNames(utilStyles.scrimLight, formStyles.scrim, formStyles.scrimThin)}
                component="div"
                name={name} />
        </div>
    )
}