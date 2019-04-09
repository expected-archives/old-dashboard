import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { Navbar, Footer } from "./Layout"
import { ListContainer, NewContainer } from "./Container"
import { ListImage } from "./Image"
import { Account } from "./Account"

export default () => (
  <>
    <Navbar/>

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
