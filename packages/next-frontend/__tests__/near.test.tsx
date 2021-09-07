/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import { getWalletConnection } from "../hooks/near"

 
describe('Smoke', () => {
  it('succeeds', async () => {
    const wallet = await getWalletConnection()
    console.log(wallet?.account().accountId)
		expect(wallet?.account().accountId)
  })
})

