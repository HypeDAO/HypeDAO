import classNames from "classnames";
import utilStyles from '../../styles/utils.module.css'
import formStyles from '../../styles/components/form.module.css'

import { Fields } from '../../components/form/Fields'
import { Label } from '../../components/form/Label'

import successIcon from '../../public/images/baseline_check_circle_outline_white_48dp.png'
import errorIcon from '../../public/images/baseline_error_white_48dp.png'

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Image from 'next/image'

import { getTransactionState } from '../../hooks/near'
import { ApplicationContext } from '../../context/state';


interface TransactionDetailsProps {
    successMessage: string;
    errorMessage?: string;
    backUrl: string;
}

export function TransactionDetails({ successMessage, errorMessage, backUrl }: TransactionDetailsProps) {
    const { state, dispatch } = React.useContext(ApplicationContext)
    const { query } = useRouter();
    const [success, setSuccess] = React.useState(false)
    const [details, setDetails] = React.useState('')

    useEffect(() => {
        if (query.transactionHashes) {
            if (!state.wallet)
                return
            getTransactionState(state.wallet, query.transactionHashes.toString())
                .then(result => {
                    if (!result.status) {
                        setSuccess(false)
                        setDetails("...")
                    } else {
                        console.log(result)
                        setSuccess(true)
                        setDetails("...")
                    }

                })
        }
    }, [state.wallet, query])

    return (
        <Fields>
            {success && (
                <div className={classNames(
                    utilStyles.scrimLight,
                    formStyles.scrim,
                    formStyles.scrimThin
                )}>
                    <div className={classNames(formStyles.imageContainer)}>
                        <Image
                            className={formStyles.statusIcon}
                            src={successIcon}
                            alt=""
                            layout="responsive"
                        />
                    </div>
                    <h2 className={formStyles.center}>{successMessage}</h2>
                </div>
            )}
            {!success && (
                <div className={classNames(
                    utilStyles.scrimLight,
                    formStyles.scrim,
                    formStyles.scrimThin
                )}>
                    <div className={classNames(formStyles.imageContainer)}>
                        <Image
                            className={formStyles.statusIcon}
                            src={errorIcon}
                            alt=""
                            layout="responsive"
                        />
                    </div>
                    {errorMessage && (
                        <h2 className={formStyles.center}>{errorMessage}</h2>
                    )}
                    {!errorMessage && (
                        <h2 className={formStyles.center}>Something went wrong. Please try again later!</h2>
                    )}
                </div>
            )}
            <Link href={backUrl} passHref>
                <button
                    className={classNames(
                        utilStyles.primaryButton,
                        formStyles.primaryButton
                    )}
                    type="button"
                >
                    Back
                </button>
            </Link>

        </Fields>
    )
}