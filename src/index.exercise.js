import {loadDevTools} from './dev-tools/load'
import './bootstrap'
import * as React from 'react'
import ReactDOM from 'react-dom'
import {App} from './app'
import {AppProvider} from 'context/index.exercise'

loadDevTools(() => {
  ReactDOM.render(
       <AppProvider>
            <App/>
       </AppProvider>,
    document.getElementById('root'),
  )
})
