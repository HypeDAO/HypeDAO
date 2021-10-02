import { WalletConnection } from 'near-api-js'
import React, { Dispatch, Reducer } from "react"

export interface State {
	wallet: WalletConnection | null;
}

export const initialState: any = {
  wallet: null
}

interface Action {
  type: string;
  payload: any;
}

interface Context {
  state: State;
  dispatch: Dispatch<Action>;
}

export const reducer: Reducer<State, Action> = (state: any, action: any) => {
  switch (action.type) {
    case "WALLET_CONNECTED":
      return {
        ...state,
        wallet: action.payload
      }
    default:
      return state
  }
}

export const ApplicationContext = React.createContext({} as Context);
export const StateProvider = ({ children }: any) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  return (
    <ApplicationContext.Provider value={{state, dispatch}}>
    	{ children }
    </ApplicationContext.Provider>
  )
}
