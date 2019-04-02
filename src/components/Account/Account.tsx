import React, { useState } from "react"
import { account } from "../../client"
import { FormGroup, FormSection, Header } from "../index"
import { usePromise } from "../../hooks"

export default () => {
  const { loading, data, error, dispatch } = usePromise(() => account.get(), [])
  const [reveal, setReveal] = useState<boolean>(false)
  const [apiError, setAPIError] = useState<Error | undefined>()
  
  const regenerateAPIKey = () => {
    account.regenerateApiKey()
      .then((data) => {
        dispatch({ action: "SET_DATA", data })
        setReveal(true)
        setAPIError(undefined)
      })
      .catch((error) => {
        setAPIError(error)
      })
  }

  return (
    <div>
      <Header title="Account" pretitle="Overview"/>
      {loading && (
        <p>Loading...</p>
      )}
      {error && (
        <p>Error: {error.message}...</p>
      )}
      {data && (
        <>
          {apiError && (
            <div className="alert alert-danger">
              {apiError.message}
            </div>
          )}
          <FormSection name="Profile"
                       description="Your email address is your identity on Expected and is used to log in.">
            <FormGroup name="Email">
              <input type="email" className="form-control" name="email" value={data.email} disabled/>
            </FormGroup>
            <FormGroup name="Name">
              <input type="text" className="form-control" name="name" value={data.name} disabled/>
            </FormGroup>
          </FormSection>
          <FormSection name="API Key">
            <>
              <div className="form-row form-group">
                <div className="col-10">
                  <input type={reveal ? "text" : "password"} className="form-control" name="name" value={data.apiKey}
                         disabled/>
                </div>
                <div className="col">
                  <a className="btn btn-outline-primary form-control" onClick={() => setReveal(!reveal)}>
                    Reveal
                  </a>
                </div>
              </div>
              <div className="form-group">
                <a className="btn btn-success" onClick={regenerateAPIKey}>
                  Regenerate API Key
                </a>
              </div>
            </>
          </FormSection>
        </>
      )}
    </div>
  )
}
