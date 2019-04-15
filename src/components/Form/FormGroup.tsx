import React, { ReactNode } from "react"
import { styled } from "../../style"

interface IFormGroupProps {
  error?: boolean
}

const FormGroup = styled.div<IFormGroupProps>`
  margin-bottom: 1rem;
  
  input, input:focus {
    border-color: ${props => props.error ? props.theme.color.red : ""};
  }
`

const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.5rem;
  font-size: .9375rem;
`

const Description = styled.small`
  display: block;
  margin-top: 0;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text.muted};
  font-size: 80%;
  font-weight: 400;
`

const Error = styled.div`
  width: 100%;
  margin-top: .25rem;
  font-size: 80%;
  color: ${props => props.theme.color.red};
`

interface IProps {
  name?: string
  description?: string
  error?: string
  children: ReactNode
}

export default ({ name, description, error, children }: IProps) => (
  <FormGroup error={error !== undefined}>
    {name && (
      <Label>
        {name}
      </Label>
    )}
    {description && (
      <Description>
        {description}
      </Description>
    )}
    {children}
    {error && (
      <Error>
        {error}
      </Error>
    )}
  </FormGroup>
)
