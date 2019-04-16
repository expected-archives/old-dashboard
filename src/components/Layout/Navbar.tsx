import React from "react"
import { Link, Route } from "react-router-dom"
import { styled } from "../../style"
import { Container } from "../Responsive"
import { useMappedState } from "redux-react-hook"

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
        color: ${props => props.theme.color.light};
      }
    }
  }
`

const Brand = styled(Link)`
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

const Nav = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  list-style: none;
  padding: 0;
  justify-content: flex-start;
  margin: 0 auto 0 0;
`

const NavItem = styled.li`
  align-self: center;
  
  a {
    display: block;
    padding: .5rem 1rem;
  }
`

interface INavLinkProps {
  to: string
  name: string
  exact?: boolean
}

const NavLink = ({ to, exact, name }: INavLinkProps) => {
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

const Profile = styled.div`
  align-self: center;
  color: rgba(255, 255, 255, 0.5);
  
  img {
    margin-left: 15px;
    height: 32px;
    border-radius: 5px;
  }
`

export default () => {
  const account = useMappedState(state => state.account.account)

  return (
    <Navbar>
      <NavbarContainer>
        <Brand to="/">Expected.sh</Brand>
        <Nav>
          <NavLink to="/containers" name="Containers"/>
          <NavLink to="/images" name="Images"/>
        </Nav>
        <Profile>
          {account.name}
          <img title="Avatar" alt="Avatar" src={account.avatarUrl}/>
        </Profile>
      </NavbarContainer>
    </Navbar>
  )
}
