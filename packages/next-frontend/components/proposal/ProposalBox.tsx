import classNames from "classnames";
import utilStyles from '../../styles/utils.module.css'
import styles from '../../styles/pages/Proposals.module.css'

import Big from 'big.js';

import Link from "next/link";

import { Label, FormattedLabel, ContainerLabel } from '../../components/form/Label'
import { Proposal } from "../../context/types";

interface ProposalBoxProps {
    proposal: Proposal
}

export default function ProposalBox({ proposal }: ProposalBoxProps) {
    // const getIcon = () => {
    //     return <DoneOutlineIcon style={{ color: 'white' }} />
    // } className={utilStyles.scrim}
    const nearSupplyDecimals = 24

    return (
        <li className={classNames(
            utilStyles.scrim,
            styles.proposalBox
        )}>
            {proposal.kind.Transfer && (
                <FormattedLabel
                    left={"Request for payout " +
                        Big(proposal.kind.Transfer.amount).div(Big(10).pow(nearSupplyDecimals)) +
                        " Ⓝ to " + proposal.kind.Transfer.receiver_id}
                    right={"# " + proposal.id}
                    light={true}
                />
            )}
            {proposal.kind.FunctionCall && (
                <FormattedLabel
                    left={"Function call to " + proposal.kind.FunctionCall.actions[0].method_name}
                    right={"# " + proposal.id}
                    light={true}
                />
            )}
            {proposal.kind.AddMemberToRole && (
                <FormattedLabel
                    left={"Adding " + proposal.kind.AddMemberToRole.member_id + " to the council"}
                    right={"# " + proposal.id}
                    light={true}
                />
            )}
            {proposal.kind.RemoveMemberFromRole && (
                <FormattedLabel
                    left={"Removing " + proposal.kind.RemoveMemberFromRole.member_id + " from the council"}
                    right={"# " + proposal.id}
                    light={true}
                />
            )}
            <ContainerLabel
                content={
                    <div>
                        {proposal.description}
                        {proposal.url && (
                            <div>
                                {proposal.description && (
                                    <div>
                                        <br />
                                        <br />
                                    </div>
                                )}
                                <Link href={''}>
                                    <a className={classNames(utilStyles.smallText)}>
                                        {proposal.url}
                                    </a>
                                </Link>
                            </div>
                        )}

                    </div>}
                light={true}
            />
            <FormattedLabel
                left={proposal.proposer}
                right={proposal.status}
                light={true}
                small={true}
            />
        </li >
    )
}