import Big from 'big.js';
import * as nearAPI from 'near-api-js';

export const ContractName = "hype.tkn.near"
export const TokenSymbol = "HYPE"
const StorageDeposit = Big(125).mul(Big(10).pow(19));
const TGas = Big(10).pow(12);
const BoatOfGas = Big(200).mul(TGas);


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
		// const keyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
		// const near = await nearAPI.connect(Object.assign({ deps: { keyStore } }, nearConfig));
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

export async function getHypeBalance(wallet: nearAPI.WalletConnection) {
	const tokenContract = new nearAPI.Contract(
		wallet.account(),
		ContractName,
		{
			changeMethods: ['storage_deposit'],
			viewMethods: ["get_number_of_tokens", 'get_tokens', 'get_token'], // view methods do not change state but usually return a value
		}
	);
	// console.log(await tokenContract.get_token())
	console.log(await tokenContract.get_number_of_tokens())
	// console.log(tokenContract.get_tokens())
	// return await tokenContract.get_number_of_tokens()
}


//was requestWhitelist() from (https://github.com/near-examples/token-factory/blob/master/frontend/src/App.js#L273)
export async function registerToken(wallet: nearAPI.WalletConnection) {
	const tokenContract = new nearAPI.Contract(
		wallet.account(),
		ContractName,
		{
			changeMethods: ['storage_deposit'],
			viewMethods: ["getMessages"], // view methods do not change state but usually return a value
		}
	);
	try {
		await tokenContract.storage_deposit({
			registration_only: true,
		}, BoatOfGas.toFixed(0), StorageDeposit.toFixed(0));
	} catch (error) {
		console.log(error)
	}
}