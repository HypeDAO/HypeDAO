import { useState, useEffect } from 'react'
import * as nearAPI from 'near-api-js';

export default function RegisterHype() {
    const isConnected = useState(false)
    const isRegistered = useState(false)

    useEffect(() => {

    }, [isConnected, isRegistered])

    return (
        <Button label="Register for $HYPE">
    )
}
