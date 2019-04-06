import React from "react"
import { Route } from "react-router"
import { Link } from "react-router-dom"
import NavItem from "./NavItem"
import { styled } from "../../style"

interface IProps {
  to: string
  name: string
  exact?: boolean
}

const NavLink = styled(Link)`
  display: block;
  padding: .5rem 1rem;
`

export default ({ to, exact, name }: IProps) => {
  return (
    <Route path={to} exact={exact} children={({ match }) => (
      <NavItem className={match ? "active" : ""}>
        <NavLink to={to}>
          {name}
        </NavLink>
      </NavItem>
    )}/>
  )
}
