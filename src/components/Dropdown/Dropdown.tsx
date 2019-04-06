import React, { ReactNode, useState } from "react"
import { styled } from "../../style"

interface IProps {
  overlay: () => ReactNode
  children: ReactNode
}

const Dropdown = styled.div`
  position: relative;
`

export default ({ overlay, children }: IProps) => {
  const [toggle, setToggle] = useState(false)

  return (
    <Dropdown onBlur={() => setToggle(false)}>
      <div onClick={() => setToggle(!toggle)}>
        {children}
      </div>
      {toggle && overlay()}
    </Dropdown>
  )
}
