#!/bin/bash

# Deploy and initialize Sputnik DAO factory
near dev-deploy packages/dao-contracts/sputnikdao-factory2/res/sputnikdao_factory2.wasm

source neardev/dev-account.env
near call $CONTRACT_NAME new --accountId $CONTRACT_NAME

# Configure and create HypeDAO contract
COUNCIL='["' $CONTRACT_NAME '"]'
ARGS=`echo '{"config": {"name": "hype", "symbol": "HYPE", "decimals": 24, "purpose": "test", "bond": "1000000000000000000000000", "metadata": ""}, "policy": '$COUNCIL'}' | base64 -w 0`
near call $CONTRACT_NAME create "{\"name\": \"hype\", \"args\": \"$ARGS\"}"  --accountId $CONTRACT_NAME --amount 5 --gas 150000000000000

# Add initial proposal
# HYPE_DAO=hype.$CONTRACT_NAME
# near call $HYPE_DAO add_proposal '{"proposal": {"description": "Test proposal", "submission_time":"60000000000", "kind": {"Transfer": {"token_id": "hype.tokens.testnet", "receiver_id": "'$CONTRACT_NAME'", "amount": "1000000000000", "msg": "First payout proposal"}}}}' --accountId $CONTRACT_NAME --amount 1
