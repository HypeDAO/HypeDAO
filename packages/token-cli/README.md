near-ft-query
=============

Query and cache NEP-141 token transfers.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/near-ft-query.svg)](https://npmjs.org/package/near-ft-query)
[![Downloads/week](https://img.shields.io/npm/dw/near-ft-query.svg)](https://npmjs.org/package/near-ft-query)
[![License](https://img.shields.io/npm/l/near-ft-query.svg)](https://github.com/erak/near-ft-query/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g near-ft-query
$ near-ft-query COMMAND
running command...
$ near-ft-query (-v|--version|version)
near-ft-query/0.0.1 linux-x64 node-v16.6.2
$ near-ft-query --help [COMMAND]
USAGE
  $ near-ft-query COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`near-ft-query init [ACCOUNTS]`](#near-ft-query-init-file)
* [`near-ft-query update`](#near-ft-query-update-file)
* [`near-ft-query help [COMMAND]`](#near-ft-query-help-command)

## `near-ft-query init [ACCOUNTS]`

Initializes file cache. An optional account list can be passed.

```
USAGE
  $ near-ft-query init [ACCOUNTS]

OPTIONS
  -f, --force
  -h, --help       show CLI help

EXAMPLE
  $ near-ft-query init account1.near,account2.near
```

_See code: [src/commands/init.ts](https://github.com/erak/near-ft-query/blob/v0.0.1/src/commands/init.ts)_

## `near-ft-query update`

Queries token transfers, balances and updates file cache.

```
USAGE
  $ near-ft-query update

OPTIONS
  -f, --force
  -h, --help       show CLI help

EXAMPLE
  $ near-ft-query update
```

## `near-ft-query help [COMMAND]`

display help for near-ft-query

```
USAGE
  $ near-ft-query help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_
<!-- commandsstop -->
