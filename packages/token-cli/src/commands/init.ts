import { Command, flags } from '@oclif/command'
import { retrieveLatestBlockHash } from '../near'
import { writeFile, existsSync } from 'fs'
// import { exists } from 'path'; 

const filename = "hype-tkn-near-active-accounts.json"

let cache = {
  created: new Date(),
  updated: new Date(),
  contract: 'hype.tkn.near',
  // First transaction on hype.tkn.near
  // blockhash: 'BuDrmBTYbzqCDq59B4kdme4YzdYMVfJskCNnookFaq6A',
  // Block created: August 21, 2021 at 2:55:43pm
  blockhash: '',
  accounts: []
}

export default class Init extends Command {
  static description = 'Initializes file cache. An optional account list can be passed.'

  static examples = [
    `$ near-ft-query init -`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [{name: 'accounts', description: 'List of accounts to initialize cache with.'}]

  async run() {
    const {args, flags} = this.parse(Init)

    this.log('Retrieving latest blockhash and initializing cache file', filename, '...')

    retrieveLatestBlockHash().then((blockhash) => {
      if (!args.accounts) {
        this.log('No account list provided. Defaulting to empty list.')
      } else {
        cache.accounts = args.accounts.split(',')
        cache.blockhash = blockhash
      }
  
      let content = JSON.stringify(cache)
      this.log(JSON.parse(content))
  
      if (this.shouldUpdate(filename, flags.force)) {
        writeFile(filename, content, function (err) {
          if (err) throw err;
          console.log('Cache file written.');
        });
      } else {
        console.log('Skipping.');
      }
    })    
  }

  shouldUpdate(filename: string, force: boolean) {
    let updateFile = true
    if (existsSync(filename)) {
      this.log("Existing cache file found!")
      if (force) {
        this.log("Forcing overwrite.")
      } else {
        updateFile = false
      }
    }
    return updateFile
  }
}
