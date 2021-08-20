import { useState, useContext, createContext, useMemo } from 'react'

const AppContext = createContext({})

// This is for the top-level component, providing `state`
// and `stateModifier`.
const useAppState = () => {  
  const initialState = { wallet: null }

  // Manage the state using React.useState()
  const [state, setState] = useState(initialState)

  // Build state modifier functions and use useMemo() as an optimization,
  // so this will only ever be called once.
  const stateModifier = useMemo(() => getStateModifier(setState), [setState])

  return { state, stateModifier }
}

const getStateModifier = (setState) => ({
  setWallet: (wallet) => {
    setState((state) => ({ ...state, wallet: wallet }))
  }
})

// Sub-components can use this function. It will pick up the
// `state` and `stateModifier` given by useAppState() higher in the
// component tree.
const useAppContext = () => {  
  return useContext(AppContext)
}

export { AppContext, useAppState, useAppContext }