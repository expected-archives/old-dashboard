import React, { useEffect, useState } from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { Footer, Navbar } from "./Layout"
import { ListContainer, NewContainer } from "./Container"
import { ListImage } from "./Image"
import { Account } from "./Account"
import { useDispatch } from "redux-react-hook"
import client from "../client"

export default () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | undefined>()
  const dispatch = useDispatch()

  useEffect(() => {
    let _cancelled = false

    client.getAccount()
      .then((res) => {
        if (_cancelled) {
          return
        }
        if (res.error) {
          if (res.status === 403) {
            window.location.href = process.env.AUTH_URL || "http://localhost:3002/oauth/github"
          } else {
            setError(res.error.message)
          }
        } else {
          dispatch({ type: "SET_ACCOUNT", account: res.data })
        }
      })
      .catch((error) => {
        if (_cancelled) {
          return
        }
        setError(error.message)
      })
      .finally(() => {
        if (_cancelled) {
          return
        }
        setLoading(false)
      })
    return () => {
      _cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <p>
        Loading...
      </p>
    )
  }

  if (error) {
    return (
      <p>Error: {error}</p>
    )
  }

  return (
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
