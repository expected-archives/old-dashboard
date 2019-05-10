import "./index.scss"
import React, {Component} from "react";
import {NavLink, Redirect, Route, Switch} from "react-router-dom"
import Overview from "../Overview"
import SecurityOverview from "../SecurityOverview"
import CredentialsOverview from "../CredentialsOverview"
import logo from "../../assets/logo.svg"

export default class App extends Component {
  render = () => (
    <>
      <div className="sidebar">
        <a className="sidebar-brand">
          <img src={logo} height="60px" alt="Expected logo"/>
        </a>
        <div className="sidebar-links">
          <NavLink to="/overview" activeClassName="active">
            <i className="fa fa-home"/> Overview
          </NavLink>
          <NavLink to="/apps" activeClassName="active">
            <i className="fa fa-cubes"/> Apps
          </NavLink>
          <NavLink to="/storage" activeClassName="active">
            <i className="fa fa-hdd-o"/> Storage
          </NavLink>
          <NavLink to="/network" activeClassName="active">
            <i className="fa fa-signal"/> Network
          </NavLink>
          <NavLink to="/security" activeClassName="active">
            <i className="fa fa-shield"/> Security
          </NavLink>
          <NavLink to="/credentials" activeClassName="active">
            <i className="fa fa-key"/> Credentials
          </NavLink>
        </div>
      </div>
      <div className="app-content">
        <div className="container">
          <Switch>
            <Route exact path="/overview" component={Overview}/>
            <Route exact path="/security" component={SecurityOverview}/>
            <Route exact path="/credentials" component={CredentialsOverview}/>
            <Redirect exact path="/" to="/overview"/>
          </Switch>
        </div>
      </div>
    </>
  )
}
