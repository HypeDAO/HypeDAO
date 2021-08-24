import { Command, flags } from '@oclif/command'
import { findTokenReceiver, retrieveLatestBlockHash } from '../near'
import { readFile, writeFile, existsSync } from 'fs'

const filename = "hype-tkn-near-active-accounts.json"

export default class Update extends Command {
  static description = 'Queries token transfers, balances and updates file cache.'

  static examples = [
    `$ near-ft-query init`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(Update)

    if (existsSync(filename)) {
      this.log('Updating cache file', filename, '...')

      readFile(filename, function(err, data) {
        if (err) throw err;
        let storedCache = JSON.parse(data.toString())
        
        retrieveLatestBlockHash().then((blockhash) => {
          findTokenReceiver(storedCache.blockhash, blockhash, storedCache.contract)
            .then(activeAccounts => {
              storedCache.blockhash = blockhash
              storedCache.accounts = [...new Set([...storedCache.accounts ,...activeAccounts])]
              storedCache.updated = new Date()
              console.log(storedCache)

              writeFile(filename, JSON.stringify(storedCache), function (err) {
                if (err) throw err;
                console.log('Cache file written.');
              });
            })     
        })
        
   
      });


    } else {
      this.log('No cache file found. Please create one using \'near-ft-query init\'.')
      this.log('Skipping.')
    }
      

    
  } 
}
