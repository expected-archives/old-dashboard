import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { Account, ListContainer, ListImage, NewContainer } from "./components"
import { Nav, Navbar, NavbarBrand, NavLink } from "./components/Nav"

export default () => (
  <div>
    <Navbar>
      <NavbarBrand to="/">Expected.sh</NavbarBrand>
      <Nav>
        <NavLink to="/containers" name="Containers"/>
        <NavLink to="/images" name="Images"/>
      </Nav>
    </Navbar>

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
