import React, { Component } from 'react';
import { connect } from 'react-redux'
import Breakpoints from './breakpoints'
import BreakpointActions from './store/actions';

class Breakpoint extends Component {
    constructor (props) {
        super(props)

        this.state = {
            windowWidth: typeof(window) !== 'undefined' ? window.innerWidth : 0,
            breakpoints: Breakpoints
        }

        this.handleResize = this.handleResize.bind(this)
        this.applyBreakpoints = this.applyBreakpoints.bind(this)
        this.getBreakpoint = this.getBreakpoint.bind(this)
    }

    handleResize(e) {
        this.setState({ windowWidth: window.innerWidth })
        this.getBreakpoint()
    }

    getBreakpoint(e) {
        let dispatch = this.props.dispatch
        let breakpoint = 'xlarge'

        if(this.state.windowWidth <= this.state.breakpoints.xlarge) {
            breakpoint = 'xlarge'
        }

        if(this.state.windowWidth <= this.state.breakpoints.large) {
            breakpoint = 'large'
        }

        if(this.state.windowWidth <= this.state.breakpoints.medium) {
            breakpoint = 'medium'
        }

        if(this.state.windowWidth <= this.state.breakpoints.small) {
            breakpoint = 'small'
        }

        if(this.state.windowWidth <= this.state.breakpoints.xsmall) {
            breakpoint = 'xsmall'
        }

        dispatch(BreakpointActions.setBreakpoint(breakpoint))
    }

    isNormalInteger(str) {
        var n = Math.floor(Number(str));
        return String(n) === str && n >= 0;
    }

    applyBreakpoints(e) {
        let breakpoints = {}

        if(this.props.breakpointXsmall && this.isNormalInteger(this.props.breakpointXsmall)) {
            breakpoints.xsmall = this.props.breakpointXsmall
        }

        if(this.props.breakpointSmall && this.isNormalInteger(this.props.breakpointSmall)) {
            breakpoints.small = this.props.breakpointSmall
        }

        if(this.props.breakpointMedium && this.isNormalInteger(this.props.breakpointMedium)) {
            breakpoints.medium = this.props.breakpointMedium
        }

        if(this.props.breakpointLarge && this.isNormalInteger(this.props.breakpointLarge)) {
            breakpoints.large = this.props.breakpointLarge
        }

        if(this.props.breakpointXlarge && this.isNormalInteger(this.props.breakpointXlarge)) {
            breakpoints.xlarge = this.props.breakpointXlarge
        }

        this.setState({ breakpoints: breakpoints })
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize)
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize)

        if(this.props.breakpoints) {
             this.applyBreakpoints()
        }

        this.getBreakpoint()
    }

    render() {
        return false
    }
}

export default connect()(Breakpoint)
