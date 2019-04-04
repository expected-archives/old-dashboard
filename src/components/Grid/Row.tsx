import { css } from "@emotion/core"
import { Align } from "."
import { styled } from "../../style"

interface IProps {
  alignContent?: Align
  justifyContent?: Align
}

export default styled.div<IProps>(props => css`
  display: flex;
  flex-wrap: wrap;
  align-content: ${props.alignContent || "inherit"};
  justify-content: ${props.justifyContent || "inherit"};
`)
