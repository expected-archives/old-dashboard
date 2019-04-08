import React, { ReactNode } from "react"
import { styled } from "../../style"

interface IProps {
  name?: string
  description?: string
  children: ReactNode
}

const FormGroup = styled.div`
  margin-bottom: 1rem;
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
  color: ${props => props.theme.color.muted};
  font-size: 80%;
  font-weight: 400;
`

export default ({ name, description, children }: IProps) => (
  <FormGroup>
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
  </FormGroup>
)
