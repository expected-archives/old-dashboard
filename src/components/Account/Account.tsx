import React, { useState } from "react"
import { regenerateApiKey, syncAccount } from "../../client"
import { Header } from "../Layout"
import { Button, FormGroup, FormSection, Input } from "../Form"
import { Col, Container, Row } from "../Responsive"
import { useDispatch, useMappedState } from "redux-react-hook"

export default () => {
  const account = useMappedState(state => state.account.account)
  const dispatch = useDispatch()
  const [reveal, setReveal] = useState<boolean>(false)
  const [apiError, setApiError] = useState<Error | undefined>()

  const regenerateApiKeyHandler = () => {
    regenerateApiKey()
      .then((data) => {
        dispatch({ type: "SET_ACCOUNT", account: data })
        document.cookie = `token=${data.apiKey}`
        setReveal(true)
        setApiError(undefined)
      })
      .catch((error) => setApiError(error))
  }

  const syncAccountHandler = () => {
    syncAccount()
      .then((data) => {
        dispatch({ type: "SET_ACCOUNT", account: data })
        setApiError(undefined)
      })
      .catch((error) => setApiError(error))
  }

  return (
    <>
      <Header title="Account" preTitle="Overview"/>

      <Container>
        {apiError && (
          <div className="alert alert-danger">
            {apiError.message}
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
                <Input type={reveal ? "text" : "password"} className="form-control" name="name"
                       value={account.apiKey} disabled/>
              </FormGroup>
            </Col>
            <Col extraSmall={"auto"}>
              <Button color="blue" outline onClick={() => setReveal(!reveal)}>
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
