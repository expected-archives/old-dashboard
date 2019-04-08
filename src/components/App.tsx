import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { ListContainer, NewContainer } from "./Container"
import { ListImage } from "./Image"
import { Account } from "./Account"
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "./Nav"
import { styled } from "../style"
import { Footer } from "./Layout"

const Name = styled.span`
  color: rgba(255, 255, 255, 0.5);
`

const Avatar = styled.img`
  margin-left: 15px;
  height: 32px;
  border-radius: 5px;
`

export default () => (
  <>
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

    <Footer>
      &copy; Expected.sh - All Rights Reserved 2019
    </Footer>
  </>
)
