import { CSSReset, ThemeProvider } from '@chakra-ui/core'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import store from './store'
import customTheme from './theme'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={customTheme}>
        <CSSReset/>
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
)