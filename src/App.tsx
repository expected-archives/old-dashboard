import React from "react"
import { Link, Redirect, Route, Switch } from "react-router-dom"
import { Account, Container, ListContainer, ListImage, NewContainer } from "./components"
import Navbar from "./components/Navbar"

export default () => (
  <div>
    <Navbar/>

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
