import * as nearAPI from 'near-api-js';
import { isAccountAvailable } from '../../hooks/near';

export const checkAccountAvailable = async (wallet: nearAPI.WalletConnection, value: any, allowSelf: boolean): Promise<string> => {
    return new Promise(resolve => {
        if (wallet)
            isAccountAvailable(wallet, value, allowSelf)
                .then(available => {
                    resolve('')
                })
                .catch(error => {
                    if (error.message != '')
                        resolve(error.message)
                    else
                        resolve('Cannot check account ID.')
                })
        else
            resolve('Wallet not connected. Could not check account availability.')
    })
}

export const checkUrl = (value: any) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    let error = !!pattern.test(value) ? 'Please enter a valid URL.' : ''
    return error;
}