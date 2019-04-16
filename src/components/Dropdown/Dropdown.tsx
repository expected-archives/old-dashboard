import React, { CSSProperties, ReactNode, useState } from "react"
import { styled } from "../../style"

interface IProps {
  overlay: () => ReactNode
  children: ReactNode
  style?: CSSProperties
  className?: string
}

const Dropdown = styled.div`
  position: relative;
`

export default ({ overlay, children, style = {}, className }: IProps) => {
  const [toggle, setToggle] = useState(false)

  return (
    <Dropdown onBlur={() => setToggle(false)} style={style} className={className}>
      <div onClick={() => setToggle(!toggle)}>
        {children}
      </div>
      {toggle && overlay()}
    </Dropdown>
  )
}
