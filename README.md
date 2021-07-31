# HypeDAO

## Welcome to the HypeDAO monorepo! 

For right now we only have our Next.js Frontend running, but eventually this yarn workspaces repo will contain other packages like smart contracts and a server.

If you have any questions the best way to reach us is our [Telegram](https://t.me/hypedao).

## Initial Steps
Required: [Node](https://nodejs.org/dist/latest-v12.x/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable) and [Git](https://git-scm.com/downloads)

Clone the repo:
```
git clone https://github.com/HypeDAO/HypeDAO.git
```

Install dependencies:
```
yarn install
```

## Getting Started With the Next.js Frontend

Run this command from the root folder:
```bash
yarn next:app dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


**Note:** To add libraries/dependencies you must cd into the next-frontend directory and then use the command:
```
yarn add <name>
```

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
