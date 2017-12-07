import React, { Component } from 'react'
import styles from './styles'
import Settings from '../../components/Settings'
import Logo from '../../components/Logo'
import isBreakpointSmall from '../../components/Breakpoint/isBreakpointSmall'

export default class Header extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			mobileMenu: false
		}
		
		/**
		 * @var object
		 */
		this.styles = styles(this.props)
	}
	
	handleOnClick() {
		let value = !this.state.mobileMenu
		
		this.setState({
			mobileMenu: value
		})
	}
	
	/**
	 * Renders DOM elements
	 *
	 * @return DOM elements
	 */
	renderAccountContent() {
		if(!isBreakpointSmall(this.props.breakpoint)) {
			return (
				<div id="account--content">
					<p style={this.styles.accountLine}>
						<span style={this.styles.accountBold}>Stanislav L.</span> 
						<span> Account #5671234</span>  
					</p>
					
					{this.props.availableFunds &&
						<p style={this.styles.accountLine}>
							<span>Available funds </span> 
							<span style={this.styles.accountBold}>
								{this.props.availableFunds}
							</span> 
						</p>
					}
				</div>
			)
		}
		
		return false
	}
	
	/**
	 * Renders DOM elements
	 *
	 * @return DOM elements
	 */
	renderSmallAccountContent() {
		if(isBreakpointSmall(this.props.breakpoint) && this.state.mobileMenu) {
			return (
				<div 
					style={this.styles.accountContentContainerSmall}
					id="account--content-small">
					
					<div style={Settings.width.container}>
						<p style={this.styles.accountLineSmall}>
							<span style={this.styles.accountBold}>Stanislav L.</span> 
							<span> Account #5671234</span>  
						</p>
						
						{this.props.availableFunds &&
							<p style={this.styles.accountLineSmall}>
								<span>Available funds </span> 
								<span style={this.styles.accountBold}>
									{this.props.availableFunds}
								</span> 
							</p>
						}
					</div>
				</div>
			)
		}
		
		return false
	}

	/**
     * Renders DOM elements
     *
     * @return DOM elements
     */
	render() {
		return (
			<div style={this.styles.container}>
				<div style={Object.assign({},
					Settings.width.container,
					this.styles.contentContainer)}>
					
					<div style={this.styles.containerLeft}>
						<Logo />
					</div>
					
					<div style={this.styles.containerRight}>
						<div style={Object.assign({},
							this.styles.accountContainer,
							isBreakpointSmall(this.props.breakpoint) && this.styles.accountContainerSmall)}>
							
							<img 
								src="/images/account.jpg" 
								id="account--image"
								alt="account" 
								style={Object.assign({},
									this.styles.accountImage,
									isBreakpointSmall(this.props.breakpoint) && this.styles.accountImageSmall
								)}
								onClick={this.handleOnClick.bind(this)}
							/>
							
							{this.renderAccountContent()}
						</div>
						
						<img 
							src="/images/bitcoin-white.svg" 
							alt="currency" 
							style={Object.assign({},
								this.styles.currencyImage,
								isBreakpointSmall(this.props.breakpoint) && this.styles.currencyImageSmall
							)}
						/>
					</div>
				</div>
				
				{this.renderSmallAccountContent()}
			</div>
		);
	}
}
