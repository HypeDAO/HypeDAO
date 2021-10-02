import classNames from "classnames";
import Layout from "../../components/layout";
import utilStyles from '../../styles/utils.module.css'
import formStyles from '../../styles/components/form.module.css'
import styles from '../../styles/components/token-send.module.css'

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { HypeTransfer } from '../../context/types';
import { ApplicationContext } from '../../context/state';
import { sendHype, requestBalance, requestHypeBalance } from '../../hooks/near'

import { checkAccountAvailable, checkUrl } from '../../components/form/validate'
import { TransactionDetails } from '../../components/form/TransactionDetails'
import { FormWizard } from '../../components/form/FormWizard'
import { Fields, InputType } from '../../components/form/Fields'
import { Label, FormattedLabel } from '../../components/form/Label'
import { LabeledField, Options } from '../../components/form/LabeledField'
import { FormStyle } from "../../components/form/utils";


export default function SendToken() {
    const { query } = useRouter();

    const { state, dispatch } = React.useContext(ApplicationContext)
    const [receiver, setReceiver] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [url, setUrl] = React.useState('')
    const [amount, setAmount] = React.useState(0)

    const [balance, setBalance] = useState(0)
    const [tokenBalance, setTokenBalance] = useState(0)

    const [estimatedFees] = useState(0.00125)
    const [estimatedFeesCovered, setEstimatedFeesCovered] = useState(false)

    const validateAccount = (value: any) => {
        setReceiver(value)
        if (state.wallet)
            return checkAccountAvailable(state.wallet, value, false)
    }

    const validateAmount = (value: any) => {
        let error = value <= 0 ? 'Please enter a non-zero or negative amount.' : ''
        setAmount(value)
        if (tokenBalance < value)
            error = "Insufficient funds: " + tokenBalance + " HYPE"
        return error;
    }

    const accountId = (): string => {
        const accountId = state.wallet?.account().accountId
        return accountId ? accountId : ''
    }

    const send = (values: any) => {
        if (!state.wallet || !receiver || !amount) return
        sendHype(state.wallet, receiver, amount)
            .then(() => { })
            .catch(error => {
                console.log(error)
            })
    }

    const isWalletCallback = () => {
        return query.transactionHashes ? true : false
    }

    useEffect(() => {
        if (!state.wallet) return
        if (state.wallet?.isSignedIn()) {

            requestBalance(state.wallet)
                .then(balance => {
                    setBalance(balance)
                    
                })
            requestHypeBalance(state.wallet, state.wallet.account().accountId)
                .then(hypeBalance => {
                    if (hypeBalance) {
                        setTokenBalance(hypeBalance.balance)
                    }
                })
        }
    }, [state.wallet])

    useEffect(() => {
        setEstimatedFeesCovered(balance > estimatedFees)
    }, [balance])

    return (
        <Layout>
            <main>
                <h1 className={utilStyles.title}>Send HYPE</h1>
                {!isWalletCallback() && (
                    <FormWizard
                        initialValues={{
                            receiver: '',
                            amount: '',
                        } as HypeTransfer}
                        onSubmit={async (values: any) =>
                            send(values)
                        }
                        style={FormStyle.Wallet}
                    ><Fields>
                            <LabeledField
                                type={InputType.Number}
                                name={"amount"}
                                placeholder={"0 HYPE"}
                                validate={validateAmount}
                            />
                        </Fields>

                        <Fields>
                            <LabeledField
                                type={InputType.Text}
                                name={"receiver"}
                                placeholder={"Receiver"}
                                validate={validateAccount}
                            />
                        </Fields>

                        <Fields>
                            <FormattedLabel
                                left={"Receiver"}
                                right={receiver}
                                light={false}
                                padded={true}
                            />

                            <FormattedLabel
                                left={"Amount"}
                                right={amount + " HYPE"}
                                light={false}
                                padded={true}
                            />
                            <FormattedLabel
                                left={"Estimated fees"}
                                right={estimatedFees + " Ⓝ"}
                                light={true}
                                padded={true}
                            />

                            {!estimatedFeesCovered && (
                                <Label
                                    text={"Cannot cover transaction fees. Insufficient funds: " + balance.toFixed(2) + " NEAR"}
                                    light={true}
                                />
                            )}
                        </Fields>
                    </FormWizard>
                )}
                {isWalletCallback() && (
                    <TransactionDetails
                        successMessage="Proposal successfully submitted!"
                        backUrl={"/proposals"}
                    />
                )}
            </main>
        </Layout>
    )
}