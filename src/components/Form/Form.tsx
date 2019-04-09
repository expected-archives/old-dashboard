import React, { FormEvent, ReactNode } from "react"
import { styled } from "../../style"
import { Loader } from "../Loader"

interface IProps {
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void
  loading?: boolean
  children: ReactNode
}

const Form = styled.form`
  margin-bottom: 3rem;
`

export default ({ onSubmit, loading = false, children }: IProps) => (
  <Form onSubmit={onSubmit}>
    <Loader loading={loading}>
      {children}
    </Loader>
  </Form>
)
