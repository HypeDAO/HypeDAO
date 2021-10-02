import utilStyles from '../../styles/utils.module.css'
import Layout from "../../components/layout";

import React from "react";
import { useRouter } from "next/router";

import { checkAccountAvailable, checkUrl } from '../../components/form/validate'
import { addPayoutProposal } from '../../hooks/near-dao'

import { PayoutProposal } from '../../context/types';
import { ApplicationContext } from '../../context/state'

import { TransactionDetails } from '../../components/form/TransactionDetails'
import { FormWizard } from '../../components/form/FormWizard'
import { Fields, InputType } from '../../components/form/Fields'
import { Label, FormattedLabel } from '../../components/form/Label'
import { LabeledField, Options } from '../../components/form/LabeledField'
import { FieldStyle, FormStyle } from '../../components/form/utils';




export default function New() {
    const { state, dispatch } = React.useContext(ApplicationContext)
    const { query } = useRouter();
    const [receiver, setReceiver] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [url, setUrl] = React.useState('')
    const [amount, setAmount] = React.useState(0)

    const proposalTypes = [{
        label: "Payout Proposal",
        value: "payout-proposal"
    } as Options]

    const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

    const validateAccount = (value: any) => {
        setReceiver(value)
        if (state.wallet)
            return checkAccountAvailable(state.wallet, value, false)
    }

    const validateDescription = (value: any) => {
        let error = value.length == 0 ? 'Please enter a description.' : ''
        setDescription(value)
        return error;
    }

    const validateUrl = (value: any) => {
        setUrl(value)
        return checkUrl(value);
    }

    const validateAmount = (value: any) => {
        let error = value <= 0 ? 'Please enter a non-zero or negative amount.' : ''
        setAmount(value)
        return error;
    }

    const submitProposal = (values: any) => {
        if (!state.wallet || !receiver || !amount) return
        const longDescription = description + "(" + url + ")"
        addPayoutProposal(state.wallet, receiver, longDescription, amount)
            .then(() => {})
            .catch((error: any) => {
                console.log(error)
            })
    }

    const isWalletCallback = () => {
        return query.transactionHashes ? true : false
    }

    return (
        <Layout>
            <main>
                <h1 className={utilStyles.title}>Add Proposal</h1>
                {!isWalletCallback() && (
                    <FormWizard
                        initialValues={{
                            type: '',
                            receiver: '',
                            description: '',
                            url: '',
                            amount: '',
                        } as PayoutProposal}
                        onSubmit={async (values: any) =>
                            submitProposal(values)
                        }
                        style={FormStyle.DAO}
                    >
                        <Fields>
                            <LabeledField
                                type={InputType.Select}
                                name={"type"}
                                placeholder={"Payout Proposal"}
                                disabled={true}
                                options={proposalTypes}
                                validate={(value: any) => { }}
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
                            <LabeledField
                                type={InputType.Text}
                                name={"description"}
                                placeholder={"Description"}
                                validate={validateDescription}
                            />
                        </Fields>
                        <Fields>
                            <LabeledField
                                type={InputType.Text}
                                name={"url"}
                                placeholder={"Url to HYPE forum"}
                                validate={validateUrl}
                            />
                        </Fields>
                        <Fields>
                            <LabeledField
                                type={InputType.Number}
                                name={"amount"}
                                placeholder={"0 Ⓝ"}
                                validate={validateAmount}
                            />
                        </Fields>
                        <Fields>
                            <FormattedLabel
                                left={"Payout to"}
                                right={receiver}
                                light={false}
                                padded={true}
                            />

                            <Label
                                text={description}
                                light={false}
                            />

                            <FormattedLabel
                                left={"Amount"}
                                right={amount + " Ⓝ"}
                                light={false}
                                padded={true}
                            />

                            <Label
                                text={"You will pay a deposit of Ⓝ1.00 to add this proposal! It will be refunded if proposal rejected or expired."}
                                light={true}
                            />
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
        </Layout >
    )
}