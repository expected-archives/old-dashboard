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
      <li className={`nav-item ${match && "active"}`}>
        <Link to={to} className="nav-link">
          {name}
        </Link>
      </li>
    )}/>
  )
}

const Navbar = styled.div`
  background: ${props => props.theme.color.dark};
  padding: 10px 0;
`

const Nav = styled.div`
  
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
  color: ${props => props.theme.color.greyDark};
`

const Avatar = styled.img`
  margin-left: 15px;
  height: 32px;
  border-radius: 5px;
`

export default () => {

  return true ? (<nav className="navbar navbar-expand-lg navbar-dark">
    <Container>
      <Link to="/" className="navbar-brand">
        Expected.sh
      </Link>
      <button className="navbar-toggler" type="button">
        <span className="navbar-toggler-icon"/>
      </button>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav">
          <NavLink to="/containers" name="Containers"/>
          <NavLink to="/images" name="Images"/>
        </ul>
        <ul className="navbar-nav ml-auto">
          <NavLink to="/account" name="Account"/>
        </ul>
      </div>
    </Container>
  </nav>) : (
    <Navbar>
      <Container>
        <Row>
          <Col>
            <Brand to="/">Expected.sh</Brand>
          </Col>
          <Col auto>
            <Name>Rémi Caumette</Name>
            <Avatar src="https://avatars2.githubusercontent.com/u/32649258?v=4"/>
          </Col>
        </Row>
      </Container>
      <Container>
        <Nav>
          <NavLink to="/containers" name="Containers"/>
          <NavLink to="/images" name="Images"/>
        </Nav>
        <Nav >
          <NavLink to="/account" name="Account"/>
        </Nav>
      </Container>
    </Navbar>
  )
}
