import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { Account, ListContainer, ListImage, NewContainer } from "./components"
import { Nav, Navbar, NavbarBrand, NavLink, NavItem } from "./components/Nav"
import { styled } from "./style"

const Name = styled.span`
  color: rgba(255, 255, 255, 0.5);
`

const Avatar = styled.img`
  margin-left: 15px;
  height: 32px;
  border-radius: 5px;
`

export default () => (
  <div>
    <Navbar>
      <NavbarBrand to="/">Expected.sh</NavbarBrand>
      <Nav style={{ marginRight: "auto" }}>
        <NavLink to="/containers" name="Containers"/>
        <NavLink to="/images" name="Images"/>
      </Nav>
      <Nav>
        <NavItem>
          <Name>Rémi Caumette</Name>
          <Avatar src="https://avatars2.githubusercontent.com/u/32649258?v=4"/>
        </NavItem>
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
