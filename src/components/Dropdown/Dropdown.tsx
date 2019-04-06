import React, { ReactNode } from "react"
import { styled } from "../../style"


interface IProps {
  children: ReactNode
}

const Dropdown = styled.div`

`

export default ({ children }: IProps) => {
  return (
    <Dropdown>
      {children}
    </Dropdown>
  )
}
