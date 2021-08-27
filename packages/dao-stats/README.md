dao-stats
==========

A DAO analytics tool on [NEAR Protocol](https://near.org). Works on a JSON file cache in which it stores and updates filtered and then aggregatred data from recent transactions fetched via [near-api-js](https://github.com/near/near-api-js).

Contents
========

1. [Overview](#overview)
2. [JSON file schema](#json-file-schema)
3. [Usage](#usage)
4. [Commands](#commands)

# Overview

The purpose of the dao-stats CLI is to provide a tool that can keep track of activity data on the NEAR blockchain. It scrapes a given interval of blocks for transactions that match certain criteria and stores aggregated data in a JSON file cache. Currently these criteria are hard-coded (see [implementation details](#dao-stats-update)) and result in the JSON file schema described in the next section.

# JSON file schema

The file schema is meant to be open and to be extended in the future based on the analytics data needed. Since the purpose is to make analytics data available to DAO toolchains, this schema could also act as a prototype of a common standard useful to a variety different DAO's.

## Fields

- `created`: date on which the cache file was initially created
- `updated`: date on which the cache file updated
- `blockhash`: blockhash of latest block either during creation or update

### `token`

As there's a good chance a DAO has a (fungible) utility token, usage data of that token might be needed. Having aggregated data of active accounts, balances, activity and such can be helpful to build operational tools for them.  

#### `contract`

On the NEAR blockchain, every fungible token that implements (NEP-141)[https://nomicon.io/Standards/FungibleToken/Core.html] has an own token contract deployed. The account of this token contract mussed be passed via the commandline, such that transactions can be filtered to have this contract as the receiver (of function calls).

#### `activeAccounts`

List of accounts that were receiver of a `ft_transfer` call on the token contract. It
contains no duplicates and can be initialized via the commandline with `--accounts [comma-separated list]`.

## Example

```json
{
  "created": "2021-08-27T14:32:41.940Z",
  "updated": "2021-08-31T13:27:06.892Z",
  "blockhash": "25QoWCpiDxPMK2FQLM17yXb8ybY8YdMoEucwEmguHfDy",
  "token": {
    "contract": "hype.tkn.near",
    "activeAccounts": [
      "account1.near",
      "account2.near"
    ]
  }
}
```

# Usage

```sh-session

$ npm install -g dao-stats
$ dao-stats COMMAND
$ dao-stats (-v|--version|version)
$ dao-stats --help [COMMAND]
```

# Commands

* [`dao-stats init [CONTRACT] --accounts=accounts`](#dao-stats-init)
* [`dao-stats update [CONTRACT]`](#dao-stats-update)
* [`dao-stats test`](#dao-stats-test)
* [`dao-stats help [COMMAND]`](#dao-stats-help)

## `dao-stats init`

Initializes file cache for a given token contract. An optional account list can be passed.

```
USAGE
  $ dao-stats init [CONTRACT]

ARGUMENTS
  CONTRACT  Token contract to initialize cache with

OPTIONS
  -a, --accounts=accounts  List of accounts to initialize cache with
  -f, --force              Overwrite file cache if exists.

EXAMPLE
  $ dao-stats init hype.tkn.near --accounts=account1.near,account2.near
```

## `dao-stats update`

Fetches recent blocks, filters transactions and updates aggregated data in the file cache. Currently the following filters and aggregators are active:

Filters:
- `receiver_id` is given token contract and it's a function call to `ft_transfer`

Aggregators:
- all accounts that were passed as `receiver_id` to the `ft_transfer` call.

```
USAGE
  $ dao-stats update [CONTRACT]

ARGUMENTS
  CONTRACT  Update cached data for given contract

EXAMPLE
  $ dao-stats update hype.tkn.near

  Reading block 0 GMQYTeX6kqV2wGPWYZGp7zEZ7YjYQjbqgZ1obViAvXGm
  Matching transactions: [
    {
      actions: [ [Object] ],
      hash: '5tu1tSAgBUQMfnjJ4eafM2PTeyubUrBpBSjJQ5o73aTT',
      nonce: 38917325000073,
      public_key: 'ed25519:AuguBFwmBNuTtXbivvhZ9eLpC7V8MGwzUVvjn4r5kLWh',
      receiver_id: 'hype.tkn.near',
      signature: 'ed25519:4W85cUXUhjrHN9ZW4uu45EXrbWryxkNP19cXadPd8V9i3EQKzERtZ6JbmJ42icRmUJF86FnT5NcBHUyvaY8nZdLv',
      signer_id: 'ev3reth.near'
    }
  ]
  Transaction links: [
    {
      method: 'ft_transfer',
      arguments: { amount: '50000000000000000000', receiver_id: 'kodandi.near' },
      link: 'https://explorer.near.org/transactions/5tu1tSAgBUQMfnjJ4eafM2PTeyubUrBpBSjJQ5o73aTT'
    }
  ]
```

## `dao-stats test`

Tests filters and aggregators on one specific, hard-coded interval containing exactly one block.

```
USAGE
  $ dao-stats test
```

## `dao-stats help`

Display help for dao-stats command.

```
USAGE
  $ dao-stats help [COMMAND]

ARGUMENTS
  COMMAND  Command to show help for

OPTIONS
  --all  see all commands in CLI
```

<!-- commandsstop -->
