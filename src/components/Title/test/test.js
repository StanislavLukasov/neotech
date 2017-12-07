import React from 'react';
import { renderComponent , expect } from 'chai';
import Component from '../index';
import { mount, shallow } from 'enzyme';

const props = {
    tag: 'h2',
    title: 'Hello world'
}

const wrapper = mount(<Component {...props}/>);
const wrapperNoProps = mount(<Component />);

describe('Title component', () => {
    it('It exists!', () => {
    	expect(Component).to.exist
    });

    it('It displays the correct tag when props passed', () => {
        expect(wrapper.find('h2')).to.have.length(1);
    });

    it('Its hidden if title prop is not passed', () => {
        expect(wrapperNoProps.find('h1')).to.have.length(0);
    });

    it('Its renders text', () => {
        expect(wrapperNoProps.find('h1')).to.have.length(0);
        expect(wrapper.text()).to.contain('Hello world');
    });
});
