import Big from 'big.js';
import * as nearAPI from 'near-api-js';

export const ContractName = "hype.tkn.near"
export const TokenSymbol = "HYPE"
const tokenSupplyDecimals = 18
const nearSupplyDecimals = 24
const StorageDeposit = Big(125).mul(Big(10).pow(19));
const TokenTransfer = Big(1);
const TGas = Big(10).pow(12);
const BoatOfGas = Big(200).mul(TGas);
const AccountValidator = /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/;

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

export function getProvider(network: string): nearAPI.providers.JsonRpcProvider {
	return new nearAPI.providers.JsonRpcProvider(
		"https://rpc." + network + ".near.org"
	);
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

export function sendHype(wallet: nearAPI.WalletConnection,
	receiver: string, amount: number): Promise<void> {

	const tokenContract = new nearAPI.Contract(
		wallet.account(),
		getContractName(wallet._networkId),
		{
			changeMethods: ['ft_transfer'],
			viewMethods: ["ft_balance_of"],
		}
	);

	return new Promise(resolve => {
		// @ts-ignore: ft_balance_of doesn't exist on generic contract but does on the one we just called
		tokenContract.ft_transfer({
			receiver_id: receiver,
			amount: Big(amount).mul(Big(10).pow(tokenSupplyDecimals)).toNumber().toString()
		}, BoatOfGas.toFixed(0), TokenTransfer.toFixed(0))
			.then(() => {
				resolve()
			})
	})
}

export function requestBalance(wallet: nearAPI.WalletConnection): Promise<number> {
	return new Promise(resolve => {
		wallet.account().getAccountBalance()
			.then(accountBalance => {
				resolve(Big(accountBalance.available).div(Big(10).pow(nearSupplyDecimals)).toNumber())
			})
	})
}

export function requestHypeBalance(wallet: nearAPI.WalletConnection, account: string): Promise<HypeBalanceInterface | null> {
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

export async function getTransactionState(wallet: nearAPI.WalletConnection, txHash: string) {
	const provider = getProvider(wallet._networkId)
	return await provider.txStatus(txHash, wallet.account().accountId);
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

function getAccount(wallet: nearAPI.WalletConnection, accountId: string) {
	return new nearAPI.Account(wallet.account().connection, accountId);
}

function isLegitAccountId(accountId: string) {
	return AccountValidator.test(accountId);
}

export async function checkAccountAvailable(wallet: nearAPI.WalletConnection, accountId: string) {
	if (!isLegitAccountId(accountId)) {
		throw new Error('Invalid username.');
	}
	if (accountId !== wallet.account().accountId) {
		return await (await getAccount(wallet, accountId)).state();
	} else {
		throw new Error('You are logged into account ' + accountId + ' .');
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
