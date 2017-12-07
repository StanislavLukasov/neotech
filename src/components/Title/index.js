import React, { Component } from 'react';

export default class Title extends Component {
    constructor(props) {
        super(props)

        this.tag = this.props.tag || 'h1'
        this.styles = this.renderStyles()
    }

    renderStyles() {
        let styles = {
            width: this.props.width || 'auto',
            maxWidth: this.props.maxWidth || 'none',
            textAlign: this.props.textAlign || 'left',
            fontSize: this.props.fontSize || '2rem',
            fontWeight: this.props.fontWeight || '700',
            lineHeight: this.props.lineHeight || 1,
            color: this.props.color || 'unset',
            margin: this.props.margin || 0,
            padding: this.props.padding || 0,
            textTransform: this.props.textTransform || 'initial',
            borderBottom: this.props.borderBottom || 0,
            display: this.props.display || 'block'
        }

        return styles
    }

    render() {
        if(this.props.title) {
            return (
                <this.tag style={this.styles}>
                    {this.props.title}
                </this.tag>
            )
        }

        return false
    }
}
