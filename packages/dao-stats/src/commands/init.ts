import { Command, flags } from '@oclif/command'
import { retrieveLatestBlockHash } from '../near'
import { writeFile, existsSync } from 'fs'

const filename_prefix = 'dao-stats-'
const filename_postfix = '.json'

let cache = {
  created: new Date(),
  updated: new Date(),
  blockhash: '',
  token: {
    contract: '',
    activeAccounts: []
  }
}

export default class Init extends Command {
  static description = 'Initializes file cache. An optional account list can be passed.'

  static examples = [
    `$ dao-stats init hype.tkn.near --accounts account-a.near,account-b.near`,
  ]

  static flags = {
    help: flags.help({char: 'h'}),
    force: flags.boolean({char: 'f'}),
    accounts: flags.string({
      char: 'a',
      description: 'List of accounts to initialize cache with.'})
  }

  static args = [{
    name: 'contract',
    description: 'Token contract to initialize cache with.',
    required: true
  }]

  async run() {
    const {args, flags} = this.parse(Init)

    const filename = filename_prefix + args.contract + filename_postfix
    this.log('Retrieving latest blockhash and initializing cache file', filename, '...')

    retrieveLatestBlockHash().then((blockhash) => {
      cache.blockhash = blockhash

      cache.token.contract = args.contract

      if (!flags.accounts) {
        this.log('No account list provided. Defaulting to empty list.')
      } else {
        cache.token.activeAccounts = flags.accounts.split(',')
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
