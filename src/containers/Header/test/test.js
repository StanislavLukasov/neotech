import React from 'react'
import { expect } from 'chai'
import Component from '../header'
import { mount } from 'enzyme'

let props = {
    availableFunds: 200
}

let wrapper = mount(
    <Component {...props}/>
)

describe('Header container', () => {
    it('It exists!', () => {
    	expect(Component).to.exist
    })
    
    it('It renders containers', () => {
        expect(wrapper.find('Logo')).to.have.length(1)
        expect(wrapper.find('#account--content')).to.have.length(1)
        expect(wrapper.find('#account--content-small')).to.have.length(0)
        
        wrapper.setProps({ breakpoint: 'small' })
        wrapper.find('#account--image').simulate('click')
        expect(wrapper.find('#account--content')).to.have.length(0)
        expect(wrapper.find('#account--content-small')).to.have.length(1)
    });
})
