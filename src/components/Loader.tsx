import React, { ReactNode } from "react"
import { keyframes } from "@emotion/core"
import { styled } from "../style"

interface IProps {
  loading?: boolean
  children?: ReactNode
}

const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10000;
  height: 5em;
`

const Spinner = styled.div`
  color: ${props => props.theme.color.dark};
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  transform: translateZ(0);
  animation-delay: -0.16s;

  &, &:before, &:after {
    background: ${props => props.theme.color.dark};
    animation: ${keyframes`
      0%,
      80%,
      100% {
        box-shadow: 0 0;
        height: 4em;
      }
      40% {
        box-shadow: 0 -2em;
        height: 5em;
      }
    `} 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
  }
  
  &:before, &:after {
    position: absolute;
    top: 0;
    content: '';
  }
  
  &:before {
    left: -1.5em;
    animation-delay: -0.32s;
  }
  &:after {
    left: 1.5em;
  }
`

export default ({ loading = true, children }: IProps) => {
  return (
    <div style={loading ? { userSelect: "none", pointerEvents: "none", overflow: "hidden" } : {}}>
      {loading && (
        <Loader>
          <Spinner/>
        </Loader>
      )}
      <div style={loading ? { opacity: 0.3 } : {}}>
        {children}
      </div>
    </div>
  )
}
