import React, { Component } from 'react'
import styles from './styles'

export default class Logo extends Component {
	constructor(props) {
		super(props)
		
		/**
		 * @var string
		 */
		this.text = 'coinbet'
		
		/**
		 * @var object
		 */
		this.styles = styles(this.props)
	}

	/**
     * Renders logo DOM elements
     *
     * @return DOM elements
     */
	renderTag() {
		return (
			<a href="/">
				{this.text}
			</a>
		)
	}

	/**
     * Renders DOM elements
     *
     * @return DOM elements
     */
	render() {
		return (
			<div style={this.styles.logo}>
				{this.renderTag()}
			</div>
		);
	}
}
