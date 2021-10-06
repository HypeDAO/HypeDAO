import Big from 'big.js';
import * as nearAPI from 'near-api-js';
import { Proposal } from '../context/types';
import { cleanString, extractUrl } from './utils';

const TGas = Big(10).pow(12)
const YGas = Big(10).pow(24)
const BoatOfGas = Big(200).mul(TGas)
const ProposalBond = Big(1).mul(YGas)
const tokenSupplyDecimals = 18
const nearSupplyDecimals = 24

export function addPayoutProposal(wallet: nearAPI.WalletConnection,
	receiver: string, description: string, amount: number): Promise<void> {

	const daoContract = new nearAPI.Contract(
		wallet.account(),
		getContractName(wallet._networkId),
		{
			changeMethods: ['add_proposal'],
			viewMethods: ["get_proposals"],
		}
	);

	return new Promise(resolve => {
		
		const amountYocto = Big(amount).mul(Big(10).pow(nearSupplyDecimals)).toFixed()
		
		// @ts-ignore: add_proposal doesn't exist on generic contract but does on the one we just called
        daoContract.add_proposal({
            proposal: {
                description: description,
                submission_time: 60000000000,
                kind: {
                    Transfer: {
                        token_id: "",
                        receiver_id: receiver,
                        amount: amountYocto
                    }
                }
            }
		}, BoatOfGas.toFixed(0), ProposalBond.toFixed(0))
			.then(() => {
				resolve()
			})
	})
}

export async function getProposals(wallet: nearAPI.WalletConnection): Promise<Proposal[]> {
	const daoContract = new nearAPI.Contract(
		wallet.account(),
		getContractName(wallet._networkId),
		{
			changeMethods: [''],
			viewMethods: ["get_proposals"],
		}
	);
	
	return new Promise(resolve => {
		// @ts-ignore: get_proposals doesn't exist on generic contract but does on the one we just called
		daoContract.get_proposals({ from_index: 0, limit: 100 })
			.then((proposals: any) => {
				const list = proposals.map((p: any) => {
					return {
						id: p.id,
						description: p.description,
						url: extractUrl(p.description),
						proposer: p.proposer,
						kind: p.kind,
						status: p.status
					}
				})
				resolve(list)
			})
	})
}

function getContractName(network: string): string {
	if (process.env.daoContract)
		return process.env.daoContract
	return 'Undefined'
}