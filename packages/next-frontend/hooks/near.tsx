import Big from 'big.js';
import * as nearAPI from 'near-api-js';

export const ContractName = "hype.tkn.near"
export const TokenSymbol = "HYPE"
const StorageDeposit = Big(125).mul(Big(10).pow(19));
const TGas = Big(10).pow(12);
const BoatOfGas = Big(200).mul(TGas);



export async function requestWhitelist() {
	const tokenContractId = TokenSymbol.toLowerCase() + '.' + ContractName;
	const tokenContract = new nearAPI.Contract(_account, tokenContractId, {
		changeMethods: ['storage_deposit'],
	});
	await tokenContract.storage_deposit({
		registration_only: true,
	}, BoatOfGas.toFixed(0), StorageDeposit.toFixed(0));
}