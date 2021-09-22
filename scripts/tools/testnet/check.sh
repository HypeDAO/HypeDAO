#!/bin/bash
source neardev/dev-account.env

if [ -z "$1" ]
  then
    echo "No argument supplied"
    exit 1
fi

near view $CONTRACT_NAME ft_balance_of '{ "account_id": "'$1'" }'