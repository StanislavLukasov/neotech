import React from 'react'
import { expect } from 'chai'
import Component from '../app'
import { mount } from 'enzyme'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore([thunk]);
let store;

store = mockStore({
    breakpoint: 'small',
    funds: {
        availableFunds: 200
    }
});

let wrapper = mount(
    <Provider store={store}>
        <Component />
    </Provider>
);


describe('App', () => {
    it('It exists!', () => {
    	expect(Component).to.exist
    })
    
    it('It renders components', () => {
        expect(wrapper.find('Header')).to.have.length(1)
    })
})
