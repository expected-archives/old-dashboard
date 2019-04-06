import React, { ReactNode } from "react"
import Container from "../Responsive/Container"
import { styled } from "../../style"

const Navbar = styled.div`
  background: ${props => props.theme.color.dark};
`

// const NavItem = styled.li`
//   display: inline-block;
//   padding: 15px 10px;
//
//   a {
//     color: rgba(255, 255, 255, 0.5);
//
//     &:hover {
//       color: rgba(255, 255, 255, 0.75);
//       text-decoration: none;
//     }
//   }
//
//   &.active {
//     border-bottom: 3px solid ${props => props.theme.color.blue};
//
//     a {
//       color: #fff;
//     }
//   }
// `

interface IProps {
  children?: ReactNode
}

export default ({ children }: IProps) => {

  return (
    <Navbar>
      <Container>
        {children}
      </Container>
    </Navbar>
  )
}

// <Col auto style={{ alignSelf: "center" }}>
//           <Name>Rémi Caumette</Name>
//           <Avatar src="https://avatars2.githubusercontent.com/u/32649258?v=4"/>
//         </Col>
// const Name = styled.span`
//   color: rgba(255, 255, 255, 0.5);
// `
//
// const Avatar = styled.img`
//   margin-left: 15px;
//   height: 32px;
//   border-radius: 5px;
// `
