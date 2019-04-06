import React, { useState } from "react"
import { getAccount, regenerateApiKey, syncAccount } from "../../client"
import { FormGroup, FormSection, Header } from ".."
import { usePromise } from "../../hooks"
import Container from "../Responsive/Container"
import Loader from "../Loader"

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

  return (
    <div>
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
              <input type="email" className="form-control" name="email" value={data ? data.email : ""} disabled/>
            </FormGroup>
            <FormGroup name="Name">
              <input type="text" className="form-control" name="name" value={data ? data.name : ""} disabled/>
            </FormGroup>
            <button className="btn btn-outline-primary" onClick={syncAccountHandler}>
              Sync with GitHub
            </button>
          </FormSection>
          <FormSection name="API Key">
            <div className="form-row form-group">
              <div className="col-10">
                <input type={reveal ? "text" : "password"} className="form-control" name="name" value={data ? data.apiKey : ""}
                       disabled/>
              </div>
              <div className="col">
                <button className="btn btn-outline-primary form-control" onClick={() => setReveal(!reveal)}>
                  Reveal
                </button>
              </div>
            </div>
            <div className="form-group">
              <button className="btn btn-success" onClick={regenerateApiKeyHandler}>
                Regenerate API Key
              </button>
            </div>
          </FormSection>
        </Loader>
      </Container>
    </div>
  )
}
