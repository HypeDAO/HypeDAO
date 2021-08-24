#!/bin/bash

echo "Installing node dependencies..."
npm install oclif

echo "Running account cache update with recent blocks..."
# chmod u+x packages/token-cli/bin/run
# ls -la packages/token-cli
# ls -la packages/token-cli/bin
# ls -la packages/token-cli/src/commands
# less packages/token-cli/src/commands/update.ts
# ./packages/token-cli/bin/run

# Install CLI tool
cd packages/token-cli/
npm install
sudo npm install -g .
cd ../../

# Run update and push to branch
token-cli update

cd account-cache
cp -f ../hype-tkn-near-active-accounts.json hype-tkn-near-active-accounts.json

git add .
git commit -m "Updates account cache."
git push
cd ..

rm -Rf account-cache
