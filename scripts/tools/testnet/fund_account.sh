#!/bin/bash

source neardev/dev-account.env

if [ -z "$1" ]
  then
    echo "No argument supplied"
    exit 1
fi

echo "Transferring to" $1 "..."
near call $CONTRACT_NAME ft_transfer '{"receiver_id": "'$1'", "amount": "7889099999981000000"}' --accountId $CONTRACT_NAME --amount 0.000000000000000000000001
