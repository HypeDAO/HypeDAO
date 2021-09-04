import { Command, flags } from '@oclif/command'
import { findTokenReceiver, retrieveLatestBlockHash } from '../near'
import { readFile, writeFile, existsSync } from 'fs'

const filename_prefix = 'dao-stats-'
const filename_postfix = '.json'

export default class Update extends Command {
  static description = 'Queries token transfers, balances and updates file cache.'

  static examples = [
    `$ dao-stats init hype.tkn.near`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [{
    name: 'contract',
    description: 'Token contract to search transactions for.',
    required: true
  }]

  async run() {
    const {args, flags} = this.parse(Update)
    const filename = filename_prefix + args.contract + filename_postfix

    if (existsSync(filename)) {
      this.log('Updating cache file', filename, '...')

      readFile(filename, function(err, data) {
        if (err) throw err;
        let storedCache = JSON.parse(data.toString())
        
        retrieveLatestBlockHash()
          .then((blockhash) => {
            findTokenReceiver(storedCache.blockhash, blockhash, storedCache.token.contract)
              .then(activeAccounts => {
                storedCache.blockhash = blockhash
                storedCache.token.activeAccounts = [...new Set([...storedCache.token.activeAccounts ,...activeAccounts])]
                storedCache.updated = new Date()
                console.log(storedCache)

                writeFile(filename, JSON.stringify(storedCache), function (err) {
                  if (err) throw err;
                  console.log('Cache file written.');
                });
              })
              .catch(err => {
                console.log(err)
                process.exit(1)
              })
          })
      });
    } else {
      this.log('No cache file found. Please create one using \'dao-stats init\'.')
      process.exit(1)
    }
  }
}
