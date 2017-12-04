import React from 'react'
import { expect } from 'chai'
import Component from '../index'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import BreakpointActions from '../store/actions'
import BreakpointReducers from '../store/reducers'

const mockStore = configureMockStore([thunk])

let store = mockStore({
    breakpoint: 'xlarge'
})

const props = {
    breakpoint: 'xlarge'
}

let wrapper = mount(
    <Provider store={store}>
        <Component {...props}/>
    </Provider>
)

describe('Breakpoint component', () => {
    it('It exists!', () => {
    	expect(Component).to.exist
    })

    it('It sets actions', () => {
        let breakpoint = 'xlarge'
        const result = BreakpointActions.setBreakpoint(breakpoint)
        expect(result).to.deep.equal({ type: 'SET_BREAKPOINT', breakpoint: breakpoint })
    })

    it('It sets reducers', () => {
        let state = { breakpoint: 'xlarge' }
        let result = BreakpointReducers.setBreakpoint(state,{type:"SET_BREAKPOINT", breakpoint: 'small'})
        expect(result).to.deep.equal({ breakpoint: 'small' })
    })
})
