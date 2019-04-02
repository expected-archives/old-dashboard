import { DependencyList, Dispatch, useEffect, useReducer } from "react"

interface IState<T> {
  data?: T;
  error?: Error;
  loading: boolean;
}

type Action<T> =
  { action: "SET_DATA", data: T } |
  { action: "SET_ERROR", error: Error } |
  { action: "CLEAR" }

const reducer = <T, >(state: IState<T>, action: Action<T>): IState<T> => {
  switch (action.action) {
    case "SET_DATA":
      return {
        data: action.data,
        error: undefined,
        loading: false,
      }
    case "SET_ERROR":
      return {
        data: undefined,
        error: action.error,
        loading: false,
      }
    case "CLEAR":
      return {
        data: undefined,
        error: undefined,
        loading: true,
      }
    default:
      return state
  }
}

export default <T, >(promise: () => Promise<T>, deps?: DependencyList) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
  })

  useEffect(() => {
    let _cancelled = false
    dispatch({ action: "CLEAR" })
    promise()
      .then((data) => {
        if (!_cancelled) {
          dispatch({ action: "SET_DATA", data })
        }
      })
      .catch((error) => {
        if (!_cancelled) {
          dispatch({ action: "SET_ERROR", error })
        }
      })
    return () => {
      _cancelled = true
    }
  }, deps)

  return {
    ...state,
    dispatch,
  } as IState<T> & { dispatch: Dispatch<Action<T>> }
}
