import React, { FormEvent, ReactNode } from "react"
import { styled } from "../../style"

interface IProps {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void
  children: ReactNode
}

const Form = styled.form`
  margin-bottom: 3rem;
`

export default ({ onSubmit, children }: IProps) => (
  <Form onSubmit={onSubmit}>
    {children}
  </Form>
)
