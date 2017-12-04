import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction'
import thunk from 'redux-thunk'
import breakpoint from './breakpoint/state'

const reducers = combineReducers({
    routing: routerReducer,
    breakpoint
})

const middlewares = [thunk]

const composeEnhancers = composeWithDevTools({
    // options like actionSanitizer, stateSanitizer
})

const enhancer = composeEnhancers(applyMiddleware(...middlewares))

export default function configureStore (initialState) {
    return createStore(reducers, initialState, enhancer)
}
