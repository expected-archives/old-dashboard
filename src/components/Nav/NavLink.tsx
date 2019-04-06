import React from "react"
import { Route } from "react-router"
import { Link } from "react-router-dom"
import NavItem from "./NavItem"

interface IProps {
  to: string
  name: string
  exact?: boolean
}

export default ({ to, exact, name }: IProps) => {
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
