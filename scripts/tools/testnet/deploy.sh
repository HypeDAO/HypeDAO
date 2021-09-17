#!/bin/bash

export NEAR_ENV=testnet

# Create development account and deploy to testnet.
# Dev account will be stored in neardev/dev-account.env
near dev-deploy --wasmFile packages/ft-contract/res/fungible_token.wasm --helperUrl https://near-contract-helper.onrender.com
source neardev/dev-account.env

# Initialize token contract
near call $CONTRACT_NAME new '{"owner_id": "'$CONTRACT_NAME'", "total_supply": "10000000000000000000000", "metadata": { "spec": "ft-1.0.0", "name": "HYPE", "symbol": "HYPE", "decimals": 18 }}' --accountId $CONTRACT_NAME