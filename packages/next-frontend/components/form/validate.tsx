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
    var pattern = new RegExp(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/); // fragment locator
    return !pattern.test(value) ?
        'Please enter a valid URL.' :
        ''
}