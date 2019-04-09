import { styled } from "../../style"
import { Align } from "../Responsive"

interface IProps {
  justifyContent?: Align
  vertical?: boolean
}

export default styled.ul<IProps>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${props => props.vertical ? "column" : "row"};
  list-style: none;
  padding: 0;
  margin: 0;
  justify-content: ${props => props.justifyContent || "flex-start"};
`
