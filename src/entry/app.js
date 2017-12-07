import "babel-polyfill"
import '../styles/_main.scss'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from '../store'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import App from '../pages/App'
import Breakpoint from '../components/Breakpoint'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Breakpoint />
            
            <Router history={history}>
                <Route path="/" component={App}/>
            </Router>
        </div>
    </Provider>
, document.querySelector('.app'))
