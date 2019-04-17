import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { Footer, Navbar } from "./Layout"
import { ListContainer, NewContainer } from "./Container"
import { ListImage } from "./Image"
import { Account } from "./Account"
import { account } from "../client"
import { usePromise } from "../hooks"
import { useDispatch } from "redux-react-hook"

export default () => {
  const { data, loading, error } = usePromise(async () => {
    const res = await account.getAccount() as account.AccountResponse
    if (res.account) {
      return res.account
    }
  }, [])
  const dispatch = useDispatch()

  if (data) {
    dispatch({ type: "SET_ACCOUNT", account: data })
  } else if (error) {
    window.location.href = process.env.AUTH_URL || "http://localhost:3002/oauth/github"
  }

  return loading ? (
    <p>
      Loading...
    </p>
  ) : (
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
}
