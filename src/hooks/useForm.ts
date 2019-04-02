import { ChangeEvent, FormEvent, useReducer } from "react"

interface IState<T> {
  error?: Error
  loading: boolean
  values: T
}

type Action<T> =
  { action: "SET_LOADING", loading: boolean } |
  { action: "SET_ERROR", error: Error } |
  { action: "SET_VALUES", values: T }

const reducer = <T, >(state: IState<T>, action: Action<T>): IState<T> => {
  switch (action.action) {
    case "SET_ERROR":
      return {
        ...state,
        error: action.error,
      }
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading,
      }
    case "SET_VALUES":
      return {
        ...state,
        values: action.values,
      }
    default:
      return state
  }
}

export default <T, >(initialValues: T, onSubmit: (values: T) => Promise<any>) => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    values: initialValues,
  })

  return {
    ...state,
    dispatch,
    handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
      dispatch({
        action: "SET_VALUES",
        values: {
          ...state.values,
          [event.target.name]: event.target.value,
        },
      })
    },
    handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
      dispatch({ action: "SET_LOADING", loading: true })
      onSubmit(state.values as T)
        .catch((error) => {
          dispatch({ action: "SET_ERROR", error })
        })
        .finally(() => {
          dispatch({ action: "SET_LOADING", loading: false })
        })
    },
  }
}
