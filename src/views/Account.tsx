import React, { ReactNode, useEffect, useState } from "react"
import { account } from "../client"
import { Form, FormGroup, Header } from "../components"

interface IProps {
  name: string
  description?: string
  children?: ReactNode
}

const FormSection = ({ name, description, children }: IProps) => {
  return (
    <div className="row form-section">
      <div className="col-md-4">
        <h3>{name}</h3>
        {description && (
          <p className="text-muted">
            {description}
          </p>
        )}
      </div>
      <div className="col-md-8">
        {children}
      </div>
    </div>
  )
}

export default () => {
  const [data, setData] = useState<account.Account | undefined>(undefined)

  useEffect(() => {
    const fetch = async () => {
      const data = await account.get()
      setData(data)
    }
    fetch().catch(console.error)
  }, [])

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
                <button className="btn btn-success mt-2">Regenerate API Key</button>
              </div>
            </>
          </FormSection>
        </Form>
      )}
    </div>
  )
}
