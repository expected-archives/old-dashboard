import React, { ReactNode } from "react"
import { Container } from "../Responsive"
import { styled } from "../../style"

const Navbar = styled.div`
  background: ${props => props.theme.color.dark};
`

const NavbarContainer = styled(Container)`
  display: flex;
  align-content: center;
  
  li {
    padding: 10px 0;
  
    a {
      color: rgba(255, 255, 255, 0.5);

      &:hover {
        color: rgba(255, 255, 255, 0.75);
        text-decoration: none;
      }
    }

    &.active {
      padding-bottom: 7px;
      border-bottom: 3px solid ${props => props.theme.color.blue};

      a {
        color: #fff;
      }
    }
  }
`

interface IProps {
  children?: ReactNode
}

export default ({ children }: IProps) => {

  return (
    <Navbar>
      <NavbarContainer>
        {children}
      </NavbarContainer>
    </Navbar>
  )
}
