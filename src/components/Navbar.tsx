import React from "react"
import { Link, Route } from "react-router-dom"
import { Container } from "."
import { styled } from "../style"
import Row from "./Grid/Row"
import Col from "./Grid/Col"

interface IProps {
  to: string
  exact?: boolean
  name: string
}

const NavLink = ({ to, exact, name }: IProps) => {
  return (
    <Route path={to} exact={exact} children={({ match }) => (
      <NavItem className={match ? "active" : ""}>
        <Link to={to}>
          {name}
        </Link>
      </NavItem>
    )}/>
  )
}

const Navbar = styled.div`
  background: ${props => props.theme.color.dark};
`

const Nav = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: inline-block;
`

const NavItem = styled.li`
  display: inline-block;
  padding: 15px 10px;
  
  a {
    color: rgba(255, 255, 255, 0.5);
    
    &:hover {
      color: rgba(255, 255, 255, 0.75);
      text-decoration: none;
    }
  }
  
  &.active {
    border-bottom: 3px solid ${props => props.theme.color.blue};
    
    a {
      color: #fff;
    }
  }
`

const Brand = styled(Link)`
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

const Name = styled.span`
  color: rgba(255, 255, 255, 0.5);
`

const Avatar = styled.img`
  margin-left: 15px;
  height: 32px;
  border-radius: 5px;
`

const Dropdown = styled.div`
  
`

export default () => {

  return (
    <Navbar>
      <Container>
        <Brand to="/">Expected.sh</Brand>
        <Nav>
          <NavLink to="/containers" name="Containers"/>
          <NavLink to="/images" name="Images"/>
        </Nav>
        <Col auto style={{ alignSelf: "center" }}>
          <Name>Rémi Caumette</Name>
          <Avatar src="https://avatars2.githubusercontent.com/u/32649258?v=4"/>
        </Col>
      </Container>
    </Navbar>
  )
}
