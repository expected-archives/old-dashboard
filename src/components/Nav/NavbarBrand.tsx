import { Link } from "react-router-dom"
import { styled } from "../../style"

export default styled(Link)`
  display: flex;
  align-self: center;
  color: ${props => props.theme.color.light};
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  white-space: nowrap;
  
  &:hover {
    color: ${props => props.theme.color.light};
    text-decoration: none;
  }
`
