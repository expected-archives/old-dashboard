import React from "react"
import { Link, Redirect, Route, Switch } from "react-router-dom"
import { Account, Container, ListContainer, ListImage, NewContainer } from "./components"

interface IProps {
  to: string
  exact?: boolean
  name: string
}

const NavLink = ({ to, exact, name }: IProps) => {
  return (
    <Route path={to} exact={exact} children={({ match }) => {
      return (
        <li className={`nav-item ${match && "active"}`}>
          <Link to={to} className="nav-link">
            {name}
          </Link>
        </li>
      )
    }}/>
  )
}

export default () => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-dark">
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
    </nav>

    <Switch>
      <Route path="/account" component={Account}/>
      <Route path="/containers/new" component={NewContainer}/>
      <Route path="/containers" component={ListContainer}/>
      <Route path="/images" component={ListImage}/>
      <Redirect from="/" to="/containers"/>
    </Switch>

    <div className="footer">
      <p className="text-muted">
        &copy; Expected.sh - All Rights Reserved 2019
      </p>
    </div>
  </div>
)
