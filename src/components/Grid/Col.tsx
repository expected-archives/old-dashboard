import { styled } from "../../style"
import { css } from "@emotion/core"

interface IProps {
  auto?: boolean
  alignSelf?: string
}

export default styled.div<IProps>(props => css`
  position: relative;
  width: ${props.auto ? "auto" : "100%"};
  flex-basis: 0;
  flex-grow: 1;
  align-self: ${props.alignSelf || "inherit"};
`)
