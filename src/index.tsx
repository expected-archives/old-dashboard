import React from "react"
import ReactDOM from "react-dom"
import { Router } from "react-router"
import { createBrowserHistory } from "history"
import { ThemeProvider } from "emotion-theming"
import { theme } from "./style"
import App from "./components/App"
import "./index.css"

const history = createBrowserHistory()

ReactDOM.render((
  <ThemeProvider theme={theme}>
    <Router history={history}>
      <App/>
    </Router>
  </ThemeProvider>
), document.getElementById("root"))
