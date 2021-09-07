import Big from 'big.js';
import * as nearAPI from 'near-api-js';

export const ContractName = "hype.tkn.near"
export const TokenSymbol = "HYPE"
const tokenSupplyDecimals = 18
const StorageDeposit = Big(125).mul(Big(10).pow(19));
const TGas = Big(10).pow(12);
const BoatOfGas = Big(200).mul(TGas);

export interface HypeBalanceInterface {
	account: string;
	balance: number;
}

export async function getWalletConnection() {
	const nearConfig = {
		networkId: "mainnet",
		nodeUrl: "https://rpc.mainnet.near.org",
		walletUrl: "https://wallet.mainnet.near.org",
		helperUrl: "https://helper.mainnet.near.org",
		explorerUrl: "https://explorer.mainnet.near.org",
		keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore(),
		contractName: ContractName,
	};

	try {
		const near = await nearAPI.connect(nearConfig)
		return new nearAPI.WalletConnection(near, ContractName);
	} catch (error) {
		console.log(error)
	}
}

export function walletSignIn(wallet: nearAPI.WalletConnection) {
	wallet.requestSignIn(
		ContractName,
		"HypeDAO",
	);
};

export function walletSignOut(wallet: nearAPI.WalletConnection) {
	wallet.signOut()
}

export function requestHypeBalance(wallet: nearAPI.WalletConnection, account: string): Promise<HypeBalanceInterface> | null {
	const tokenContract = new nearAPI.Contract(
		wallet.account(),
		ContractName,
		{
			changeMethods: ['storage_deposit'],
			viewMethods: ["ft_balance_of"],
		}
	);
	
	return new Promise(resolve => {
		// @ts-ignore: ft_balance_of doesn't exist on generic contract but does on the one we just called
		tokenContract.ft_balance_of({ account_id: account })
			.then((balance: any) => {
				resolve({
					account: account,
					balance: Big(balance).div(Big(10).pow(tokenSupplyDecimals)).toNumber()
				})
			})
	})
}

export function getActiveAccounts(): Promise<string[]> | null {
	const url = "https://raw.githubusercontent.com/erak/HypeDAO/cache/dao-stats-hype.tkn.near.json"
	const params = {
		method: "GET",
	}

	try {
		let accounts = fetch(url, params)
			.then(response => response.json())
			.then(data => data.token.activeAccounts.map((account: any) => {
				return account
			}))
		return accounts
	} catch (err) {
		console.log(err)
		return null
	}
}

export function getIsRegistered(wallet: nearAPI.WalletConnection) {
	//This may be redundant, more research into registering/whitelisting accounts needs to be done
	return wallet._authDataKey === "hype.tkn.near_wallet_auth_key"
}


//was requestWhitelist() from (https://github.com/near-examples/token-factory/blob/master/frontend/src/App.js#L273)
export async function registerToken(wallet: nearAPI.WalletConnection) {
	const tokenContract = new nearAPI.Contract(
		wallet.account(),
		ContractName,
		{
			changeMethods: ['storage_deposit'],
			viewMethods: ["getMessages"],
		}
	);
	try {
		// @ts-ignore: storage_deposit doesn't exist on generic contract but does on the one we just called
		await tokenContract.storage_deposit({
			registration_only: true,
		}, BoatOfGas.toFixed(0), StorageDeposit.toFixed(0));
	} catch (error) {
		console.log(error)
	}
}

