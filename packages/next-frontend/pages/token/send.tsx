import classNames from "classnames";
import Layout from "../../components/layout";
import utilStyles from '../../styles/utils.module.css'
import formStyles from '../../styles/components/form.module.css'
import styles from '../../styles/components/token-send.module.css'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FormInput, Label, FormattedLabel, ActiveButton } from "../../components/form"

import { getTransactionState, sendHype, requestBalance, requestHypeBalance, checkAccountAvailable } from '../../hooks/near'
import { ApplicationContext } from '../../context/state';
import { AccountBalance } from "@material-ui/icons";

export default function SendToken() {
    const [step, setStep] = useState(0)
    const [balance, setBalance] = useState(0)
    const [tokenBalance, setTokenBalance] = useState(0)
    const [amount, setAmount] = useState<number | null>(null)
    const [amountValid, setAmountValid] = useState(false)
    const [receiver, setReceiver] = useState<string | null>(null)
    const [receiverValid, setReceiverValid] = useState(false)
    const [estimatedFees] = useState(0.00125)
    const [estimatedFeesCovered, setEstimatedFeesCovered] = useState(false)
    const [statusMessage, setStatusMessage] = useState("")
    const { state, dispatch } = React.useContext(ApplicationContext)

    const { query } = useRouter();

    const handleAmountChange = (e: any) => {
        setAmount(e.target.value);

        if (!state.wallet) return
        requestHypeBalance(state.wallet, state.wallet.account().accountId)
            .then(hypeBalance => {
                if (hypeBalance) {
                    setTokenBalance(hypeBalance.balance)
                    setAmountValid(
                        e.target.value > 0 &&
                        e.target.value <= hypeBalance.balance)
                }
            })
        setEstimatedFeesCovered(balance > estimatedFees)
    }

    const handleAccountChange = (e: any) => {
        setReceiver(e.target.value);

        if (!state.wallet || !receiver) return
        checkAccountAvailable(state.wallet, e.target.value)
            .then(available => {
                setReceiverValid(true)
            })
            .catch(error => {
                setReceiverValid(false)
            })
    }

    const next = () => {
        const nextStep = (step == 3) ? 0 : (step + 1)
        setStep(nextStep)
    }

    const back = () => {
        const nextStep = (step == 0) ? 0 : (step - 1)
        setStep(nextStep)
    }

    const accountId = (): string => {
        const accountId = state.wallet?.account().accountId
        return accountId ? accountId : ''
    }

    const _handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            switch(step) {
                case 0: {
                    if (amountValid)
                        next()
                    break
                }
                case 1: {
                    if (receiverValid)
                        next()
                    break
                }
                case 2: {
                    if (estimatedFeesCovered)
                        next()
                    break
                }
                default:
                    break
            }
        }
    }

    const send = () => {
        if (!state.wallet || !receiver || !amount) return
        sendHype(state.wallet, receiver, amount)
            .then(() => {
                next()
            })
            .catch(error => {
                setStatusMessage(error)
            })
    }

    useEffect(() => {
        if (query.transactionHashes) {
            if (!state.wallet)
                return
            getTransactionState(state.wallet, query.transactionHashes.toString())
                .then(result => {
                    setStep(3)
                    if (!result.status) {
                        setStatusMessage("Error! Transfer was not successful.")
                    } else {
                        setStatusMessage("Your HYPE was transfered successfully.")
                    }
                    
                })
        }
    }, [query])

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

	return (
		<Layout>
			<main>
            <h1 className={utilStyles.title}>Send</h1>
                {step == 0 && (
                    <div className={classNames(styles.form)}>
                        <ul>
                            <li>
                                <p className={classNames(utilStyles.centerContent, utilStyles.titleSm, utilStyles.titleLabel)}>
                                    {amount ? amount : "0 "} HYPE
                                </p>
                            </li>
                            <li>                                
                                <FormInput
                                    value={amount != null ? amount.toString() : ""}
                                    placeholder="0"
                                    type="number"
                                    onChange={handleAmountChange}
                                    onKeyDown={_handleKeyDown}
                                    valid={true}
                                />
                            </li>

                            <li>
                                <FormattedLabel
                                    left={"Available to Send"}
                                    right={tokenBalance.toFixed(5) + " HYPE"}
                                    light={false}
                                />
                            </li>
                        </ul>
                        <ActiveButton
                            text={"Continue"}
                            enabled={amountValid}
                            onClick={next}
                            />
                    </div>
                )}
                {step == 1 && (
                    <div className={classNames(styles.form)}>
                        <ul>
                            <li>
                                <button
                                    className={classNames(utilStyles.noStyle, utilStyles.title)}
                                    onClick={back}>
                                    &#x2190;
                                </button>
                                <p className={classNames(styles.right, utilStyles.titleSm, utilStyles.titleLabel)}>
                                    {amount} HYPE
                                </p>
                            </li>
                            <li>
                                <FormInput
                                    value={receiver != null ? receiver : ""}
                                    placeholder="Account ID"
                                    type="text"
                                    onChange={handleAccountChange}
                                    onKeyDown={_handleKeyDown}
                                    valid={receiverValid}
                                />
                            </li>
                        </ul>                      
                        <ActiveButton
                            text={"Continue"}
                            enabled={receiverValid}
                            onClick={next}
                            />
                    </div>
                )}
                {step == 2 && (
                    <div className={classNames(styles.form)}>
                        {/* <h1 className={classNames(utilStyles.titleSm, utilStyles.centerContent)}>{amount} Hype</h1> */}
                        <h1 className={classNames(utilStyles.titleSm, utilStyles.centerContent)}>{amount} Hype</h1>
                        <ul>
                            <li>
                                <button
                                    className={classNames(utilStyles.noStyle, utilStyles.title, styles.back)}
                                    onClick={back}>
                                    &#x2190;
                                </button>
                                <p className={classNames(utilStyles.centerContent, utilStyles.titleSm, utilStyles.titleLabel)}>
                                    {amount} HYPE
                                </p>
                            </li>
                            <li>
                                <FormattedLabel
                                    left={"From"}
                                    right={accountId()}
                                    light={false}
                                />
                            </li>

                            <li>
                                <FormattedLabel
                                    left={"To"}
                                    right={receiver ? receiver : ""}
                                    light={false}
                                />
                            </li>

                            <li>
                                <FormattedLabel
                                    left={"Estimated fees"}
                                    right={estimatedFees + " NEAR"}
                                    light={true}
                                />
                            </li>
                            <li>
                                {!estimatedFeesCovered && (
                                    <Label
                                        text={"Cannot cover transaction fees. Insufficient funds: " + balance.toFixed(2) + " NEAR"}
                                    />
                                )}
                            </li>
                        </ul>
                        <ActiveButton
                            text={"Confirm & Send"}
                            enabled={estimatedFeesCovered}
                            onClick={send}
                            />
                        <Link href={'/'}>
                            <a className={classNames(utilStyles.centerContent, utilStyles.formLink)}>Cancel</a>
                        </Link>
                    </div>
                )}
                {step == 3 && (
                    <div className={classNames(styles.form)}>
                        <ul>
                            <li>
                                <p className={classNames(utilStyles.centerContent, utilStyles.titleSm, utilStyles.titleLabel)}>
                                    {amount} HYPE
                                </p>
                            </li>
                            <li>
                                <Label
                                    text={statusMessage}
                                />
                            </li>
                        </ul>
                    </div>
                )}
            </main>
        </Layout>
    )
}