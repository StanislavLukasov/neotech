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
        availableFunds: 120
    }
});

let props = {
    breakpoint: 'small',
    availableFunds: 120,
    store: store
}

let wrapper = mount(
    <Component {...props}/>
);

describe('App', () => {
    it('It exists!', () => {
    	expect(Component).to.exist
    })
    
    it('It renders correct content on load', () => {
        expect(wrapper.find('Header')).to.have.length(1)
        expect(wrapper.find('#loading')).to.have.length(1)
        expect(wrapper.find('#error')).to.have.length(0)
        expect(wrapper.find('#content')).to.have.length(0)
        expect(wrapper.find('#content--results')).to.have.length(0)
    })
    
    it('It adds currencies', () => {
        let rates = {
            bpi: {
                EUR: {
                    rate: 0.1111
                },
                USD: {
                    rate: 0.2222
                },
                GBP: {
                    rate: 0.3333
                }
            }
        }
        
        wrapper.instance().setLoading(false)
        wrapper.instance().setError(false)
        wrapper.instance().setRates(rates)
        
        expect(wrapper.find('#loading')).to.have.length(0)
        expect(wrapper.find('#error')).to.have.length(0)
        expect(wrapper.find('#content')).to.have.length(1)
        
        let currencies = [
            {
                name: 'eur',
                icon: '/images/euro-dark.svg',
                text: 'EUR',
                rate: 0.1111
            },
            {
                name: 'usd',
                icon: '/images/usd-dark.svg',
                text: 'USD',
                rate: 0.2222
            },
            {
                name: 'gbp',
                icon: '/images/gbp-dark.svg',
                text: 'GBP',
                rate: 0.3333
            }
        ]
        
        expect(wrapper.state().currencies).to.deep.equal(currencies)
        expect(wrapper.find('.currencies')).to.have.length(3)
    })
    
    it('It submits form and displays results content', () => {
        let rates = {
            bpi: {
                EUR: {
                    rate: 0.1111
                },
                USD: {
                    rate: 0.2222
                },
                GBP: {
                    rate: 0.3333
                }
            }
        }
        
        wrapper.instance().setLoading(false)
        wrapper.instance().setError(false)
        wrapper.instance().setRates(rates)
        
        wrapper.setState({
            amount: 3000,
            direction: 'up',
            agreed: true,
            form_validated: true,
            currentExchangeRate: 10
        })
        
        wrapper.find('#submit--button').simulate('click')
        expect(wrapper.state().disabled).to.equal(true)
        
        wrapper.setState({
            displayBetResult: true
        })
        
        expect(wrapper.find('#content--results')).to.have.length(1)
    })
})
