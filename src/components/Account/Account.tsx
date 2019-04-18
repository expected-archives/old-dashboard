import React, { useReducer } from "react"
import { Header } from "../Layout"
import { Button, FormGroup, FormSection, Input } from "../Form"
import { Col, Container, Row } from "../Responsive"
import { useDispatch, useMappedState } from "redux-react-hook"
import client from "../../client"

type Action =
  { type: "SET_LOADING", loading: boolean } |
  { type: "SET_REVEAL", reveal: boolean } |
  { type: "SET_ERROR", error: string }

interface IState {
  loading: boolean
  reveal: boolean
  error?: string
}

const reducer = (state: IState, action: Action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading,
      }
    case "SET_REVEAL":
      return {
        ...state,
        reveal: action.reveal,
      }
    case "SET_ERROR":
      return {
        ...state,
        error: action.error,
      }
    default:
      return state
  }
}

export default () => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    reveal: false,
  })
  const account = useMappedState(state => state.account.account)
  const reduxDispatch = useDispatch()

  const regenerateApiKeyHandler = () => {
    dispatch({ type: "SET_LOADING", loading: true })

    client.regenerateApiKey()
      .then((res) => {
        if (res.error) {
          dispatch({ type: "SET_ERROR", error: res.error.message })
        } else if (res.data) {
          reduxDispatch({ type: "SET_ACCOUNT", account: res.data })
          document.cookie = `token=${res.data.apiKey}`
          dispatch({ type: "SET_REVEAL", reveal: true })
        }
      })
      .catch((error) => dispatch({ type: "SET_ERROR", error: error.message }))
      .finally(() => dispatch({ type: "SET_LOADING", loading: false }))
  }

  const syncAccountHandler = () => {
    dispatch({ type: "SET_LOADING", loading: true })

    client.syncAccount()
      .then((res) => {
        if (res.error) {
          dispatch({ type: "SET_ERROR", error: res.error.message })
        } else if (res.data) {
          reduxDispatch({ type: "SET_ACCOUNT", account: res.data })
        }
      })
      .catch((error) => dispatch({ type: "SET_ERROR", error: error.message }))
      .finally(() => dispatch({ type: "SET_LOADING", loading: false }))
  }

  return (
    <>
      <Header title="Account" preTitle="Overview"/>

      <Container>
        {state.error && (
          <div className="alert alert-danger">
            {state.error}
          </div>
        )}
        <FormSection name="Profile"
                     description="Your email address is your identity on Expected and is used to log in.">
          <FormGroup name="Email">
            <Input type="email" className="form-control" name="email" value={account.email} disabled/>
          </FormGroup>
          <FormGroup name="Name">
            <Input type="text" className="form-control" name="name" value={account.name} disabled/>
          </FormGroup>
          <Button color="blue" outline onClick={syncAccountHandler}>
            Sync with GitHub
          </Button>
        </FormSection>
        <FormSection name="API Key">
          <Row>
            <Col>
              <FormGroup>
                <Input type={state.reveal ? "text" : "password"} className="form-control" name="name"
                       value={account.apiKey} disabled/>
              </FormGroup>
            </Col>
            <Col extraSmall={"auto"}>
              <Button color="blue" outline
                      onClick={() => dispatch({ type: "SET_REVEAL", reveal: !state.reveal })}>
                Reveal
              </Button>
            </Col>
          </Row>
          <FormGroup>
            <Button color="green" onClick={regenerateApiKeyHandler}>
              Regenerate API Key
            </Button>
          </FormGroup>
        </FormSection>
      </Container>
    </>
  )
}
