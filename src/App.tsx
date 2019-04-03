import React from "react"
import { Link, Redirect, Route, Switch } from "react-router-dom"
import { Account, ListContainer, ListImage, NewContainer } from "./components"

export default () => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Expected.sh
        </Link>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"/>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/containers" className="nav-link">
                Containers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/images" className="nav-link">
                Images
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/account" className="nav-link">
                Account
              </Link>
            </li>
          </ul>
        </div>
      </div>
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
