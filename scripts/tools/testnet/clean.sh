#!/bin/bash

# Remove account
source neardev/dev-account.env
# Currently there is no API to burn NEAR tokens directly.
# One workaround is to set the beneficiary account id to system.
# system is an account that can never be created and is used 
# internally for refunds. When the beneficiary account does not 
# exist, the tokens transferred through account deletion are 
# automatically burnt.
# https://stackoverflow.com/questions/67343963/near-protocol-equivalent-of-buring-near-tokens-by-sending-to-address0
near delete $CONTRACT_NAME system
rm neardev/dev-account.env