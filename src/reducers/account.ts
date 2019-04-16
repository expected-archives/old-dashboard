import { IAccount } from "../client"

type Action =
  { type: "SET_ACCOUNT", account: IAccount }

interface IState {
  account: IAccount | undefined
}

const INITIAL_STATE: IState = {
  account: undefined,
}

export default (state: IState = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case "SET_ACCOUNT":
      return {
        ...state,
        account: action.account,
      }
    default:
      return state
  }
}
