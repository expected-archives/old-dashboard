import React from "react"
import ReactDOM from "react-dom"
import { Router } from "react-router"
import { createBrowserHistory } from "history"
import { ThemeProvider } from "emotion-theming"
import { StoreContext } from "redux-react-hook"
import { createStore } from "redux"
import { theme } from "./style"
import reducers from "./reducers"
import App from "./components/App"
import "./index.css"

const history = createBrowserHistory()
const store = createStore(reducers)

ReactDOM.render((
  <StoreContext.Provider value={store}>
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <App/>
      </Router>
    </ThemeProvider>
  </StoreContext.Provider>
), document.getElementById("root"))
