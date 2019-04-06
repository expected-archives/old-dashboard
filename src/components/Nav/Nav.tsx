import { styled } from "../../style"
import { css } from "@emotion/core"

interface IProps {
  align?: "left" | "right"
}

export default styled.ul<IProps>(props => css`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
`)
