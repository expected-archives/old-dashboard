import { useState } from "react"
import { account } from "../../client"
import { Form, FormGroup, Header, FormSection } from "../index"
import React from "react"
import { usePromise } from "../../hooks"

export default () => {
  const [toggle, setToggle] = useState<boolean>(false)
  const { data, error, loading } = usePromise(() => account.get(), [toggle])

  return (
    <div>
      <Header title="Account" pretitle="Overview"/>
      {data && (
        <Form>
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
              <div className="form-row">
                <div className="col-10">
                  <input type="password" className="form-control" name="name" value={data.apiKey} disabled/>
                </div>
                <div className="col">
                  <button className="btn btn-outline-primary form-control">Reveal</button>
                </div>
              </div>
              <div>
                <a className="btn btn-success mt-2" onClick={() => setToggle(!toggle)}>Regenerate API Key</a>
              </div>
            </>
          </FormSection>
        </Form>
      )}
    </div>
  )
}
