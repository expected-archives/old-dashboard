import React, { useState } from "react"
import { getAccount, regenerateApiKey, syncAccount } from "../../client"
import { Header } from "../Layout"
import { Button, FormGroup, FormSection, Input } from "../Form"
import { usePromise } from "../../hooks"
import { Col, Container, Row } from "../Responsive"
import { Loader } from "../Loader"

export default () => {
  const { loading, data, error, dispatch } = usePromise(() => getAccount(), [])
  const [reveal, setReveal] = useState<boolean>(false)
  const [apiError, setApiError] = useState<Error | undefined>()

  const regenerateApiKeyHandler = () => {
    regenerateApiKey()
      .then((data) => {
        dispatch({ action: "SET_DATA", data })
        document.cookie = `token=${data.apiKey}`
        setReveal(true)
        setApiError(undefined)
      })
      .catch((error) => {
        setApiError(error)
      })
  }

  const syncAccountHandler = () => {
    syncAccount()
      .then((data) => {
        dispatch({ action: "SET_DATA", data })
        setApiError(undefined)
      })
      .catch((error) => {
        setApiError(error)
      })
  }
// form-row form-group
  return (
    <>
      <Header title="Account" preTitle="Overview"/>

      <Container>
        {error && (
          <p>Error: {error.message}...</p>
        )}
        <Loader loading={loading}>
          {apiError && (
            <div className="alert alert-danger">
              {apiError.message}
            </div>
          )}
          <FormSection name="Profile"
                       description="Your email address is your identity on Expected and is used to log in.">
            <FormGroup name="Email">
              <Input type="email" className="form-control" name="email" value={data ? data.email : ""} disabled/>
            </FormGroup>
            <FormGroup name="Name">
              <Input type="text" className="form-control" name="name" value={data ? data.name : ""} disabled/>
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
                         value={data ? data.apiKey : ""}
                         disabled/>
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
        </Loader>
      </Container>
    </>
  )
}
