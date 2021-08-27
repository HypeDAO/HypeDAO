import {Command, flags} from '@oclif/command'
import { findTokenReceiver } from '../near'

const filename = "hype-tkn-near-active-accounts.json"

export default class Test extends Command {
  static description = 'describe the command here'

  static examples = [
    `$ dao-stats test`,
  ]

  async run() {
    this.log('Testing queries...')
    
    let cache = {
      created: new Date(),
      updated: new Date(),
      blockhash: 'GMQYTeX6kqV2wGPWYZGp7zEZ7YjYQjbqgZ1obViAvXGm',
      token: {
        contract: 'hype.tkn.near',
        activeAccounts: []
      }
    }

    let last_blockhash = "9V5jrp8VRgsqNYmaC3jgyVFHPCHRQ5scAaANY3QuA5jz" // #45791792
    findTokenReceiver(cache.blockhash, last_blockhash, cache.token.contract)
      .then(activeAccounts => {
        this.log("Active accounts:", activeAccounts)
      })
  }
}
