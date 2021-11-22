# HypeDAO

## Welcome to the HypeDAO monorepo! 
This repository contains the infrastructure needed to run HypeDAO and is meant to become a template project that others can use to spin up their own DAOs! Its' organized in yarn workspaces and currently consists of the following packages:

- [`next-frontend`](#getting-started-with-the-nextjs-frontend)
- [`ts-api`](#running-our-API)
- [`ft-contract`](#running-on-testnet)
- [`dao-stats`](#how-data-caching-with-dao-stats-works)


Eventually, this repository will contain other packages in the future like smart contracts and a server.

If you have any questions the best way to reach us is our [Telegram](https://t.me/hypedao).

## Initial Steps
Required: [Node](https://nodejs.org/dist/latest-v12.x/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) and [Git](https://git-scm.com/downloads)

Clone the repo:
```
git clone https://github.com/HypeDAO/HypeDAO.git
```
*Note: you will need yarn 2 (berry)*

Install dependencies:
```
yarn install
```

## Getting Started With the Next.js Frontend
[Next.js](https://nextjs.org) frontend, running our website at [hypedao.xyz](www.hypedao.xyz). 

Run this command from the root folder:
```bash
yarn next:app dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you are running the API locally you will need to change to API_BASE env variable


**Note:** To add libraries/dependencies you must cd into the next-frontend directory and then use the command:
```
yarn add <name>
```

## Running our API
To run the api locally you will need to get the database URL and put it in your env file (remove the "example-" from ".example-env)

Then run the command yarn `api:dev`, the api will now be running on [http://localhost:8000](http://localhost:8000) 


### Testing

The frontend is setup such that it can use either Mainnet or Testnet. Please follow the instructions on [how to run on Testnet](#running-on-testnet) and replace the dev account the token contract was deployed at in `next.config.js`:
```
const testnetConfig = {
	reactStrictMode: true,
	webpack,
	env: {
		network: 'testnet',
		tokenContract: '<your-dev-account-here>'
	}
}
```

## Running on Testnet
A lot of the websites features are centered around a social token. In order to test the website on Testnet, the social token needs to be deployed on a dev account. This tokens specification follows NEP-141 and is implemented in the package `ft-contract`.

### Deploy contracts
The token contract can be deployed and initialized using a convenience script, which defines a basic setup:
```
./scripts/tools/testnet/deploy.sh
```

### Fund user's testnet account
To be able to test features connected to the social token, you might to fund your account:
```
./scripts/tools/testnet/fund_account.sh user-account.testnet
```
You can check your account's balance after by calling
```
./scripts/tools/testnet/check.sh user-account.testnet
```

### Cleanup
You can delete your account and the deployed contract with it, by calling:
```
./scripts/tools/testnet/clean.sh
```

## How data caching with `dao-stats` works
The frontend contains components which rely on on-chain data that cannot be queried in realtime, yet. Therefor we built `dao-stats`, a tool available via CLI that acts as a pseudo-indexer, fetching, indexing / aggregating and storing cached data in human-readable format.

The mechanism we set up contains the following components:

- a JSON file stored on a separate branch called [`cache`](https://github.com/HypeDAO/HypeDAO/tree/cache)
- a set of scripts (`scripts/dao-stats/` and `scripts/cache/`) that build `dao-stats` and call it to initialize and update that JSON file
- a Github action that makes use of those scripts to automate everything (configured in `.github/workflows/cache.yml`)

### Steps to set up a file cache
In case you want reproduce and or customize the cache update, please make sure to run these steps:

1. Create empty branch, e.g. `cache`
2. Checkout that branch into a subdirectory
3. Build `dao-stats` by calling `scripts/tools/dao-stats/init.sh`
4. Customize arguments passed to `dao-stats` in `scripts/cache/init.sh` and run `/scripts/cache/init.sh`
5. Copy the newly created JSON file cache `dao-stats-*` to the folder containing the `cache` branch, commit and push changes
6. Customize arguments passed to `dao-stats` in `scripts/cache/update.sh`

## General Contribution Steps
After getting your environment all set up make sure to branch off of main. 
```
git branch -b <branch-name>
```
Please stick to these general branch naming conventions:

`feature/task-description` - Feature branches are for all new feature work. Keep the task description short and sweet (and use "kabob-case")

`fix/task-description` - Fix branches should be leveraged for bug fixes on existing features

Commit your code regularly with clear commit messages that describe the step you've just taken: `git add .` (if you've added a new file) and/or `git commit -am "<message>"`

When you are ready to merge your code back to the main branch make sure to pull in the latest code and resolve any merge conflicts that may have come up (I would also recommend doing this every day if you are working on a larger feature)
```
git pull origin main
```

After this you can push your code up with `git push`. If it is your first time pushing you may get some helper text directing you on the proper command lines.

Follow the link from the cli to GitHub and if all looks well create your PR. Please use the description space to outline what you've done as well as note any new packages you've installed.

After an admin has approved the pr they will merge in the code for you.

If you wanna take on another task please branch back to main `git branch main` and pull from origin main again **before** making a new branch.

### Lastly pat yourself on the back! 
You've contributed to a revolutionary concept, pushed the boundaries of creative tech and helped many artists get the recognition and compensation they deserve. **Thank you!**


#### Known hurdles connecting people to NEAR
* Chrome (and potentially other browsers) has trouble using NEAR wallets, especially with Ledger devices.
Solution: Use Firefox

* Signing in with a wallet requires 2FA being set up, this requires at least 4 NEAR in your wallet


