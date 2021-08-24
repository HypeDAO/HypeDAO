import {Command, flags} from '@oclif/command'
import { findTokenReceiver } from '../near'

const filename = "hype-tkn-near-active-accounts.json"

export default class Test extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ near-ft-query test`,
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
    const {args, flags} = this.parse(Test)

    this.log('Testing queries...')
    
    let cache = {
      created: new Date(),
      updated: new Date(),
      contract: 'hype.tkn.near',
      blockhash: '83vrZzXWPYc14a7ZzdywfW9HevNy1TWTT1hxKLu2rDZU', // #45791790
      balances: []
    }
    let last_blockhash = "GDsnR2qc6geFWf3Ktmofa6LiX2gGPxBweXUfqFVkXeSv" // #45791792
    findTokenReceiver(cache.blockhash, last_blockhash, cache.contract)
      .then(activeAccounts => {
        this.log("Active accounts:", activeAccounts)
      })
  }
}
