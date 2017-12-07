import Prefixer from 'inline-style-prefixer'

export default function styles(props) {
	let styles = {
		container: {
			padding: '1rem 0',
			background: '#0667D0',
			width: '100%',
			position: 'relative'
		},
		contentContainer: {
			display: 'flex'
		},
		containerLeft: {
			display: 'flex',
			alignItems: 'center',
		},
		containerRight: {
			display: 'flex',
			alignItems: 'center',
			marginLeft: 'auto'
		},
		accountContainer: {
			display: 'flex',
			alignItems: 'center',
			borderRight: '0.0625rem solid #4f7aaa',
			padding: '0 1rem 0 0',
		},
		accountContainerSmall: {
			cursor: 'pointer'
		},
		accountImage: {
			borderRadius: '100%',
			width: '2.5rem'
		},
		accountImageSmall: {
			width: '2rem'
		},
		accountLine: {
			padding: '0 0 0 1rem',
			margin: 0,
			lineHeight: 1.35,
			color: '#C5C5C5'
		},
		accountLineSmall: {
			padding: 0,
			margin: 0,
			lineHeight: 1.35,
			color: '#C5C5C5'
		},
		accountBold: {
			color: 'white'
		},
		currencyImage: {
			width: '2rem',
			margin: '0 0 0 1rem'
		},
		currencyImageSmall: {
			width: '1.5rem'
		},
		accountContentContainerSmall: {
			position: 'absolute',
			top: '4rem',
			left: 0,
			width: '100%',
			background: '#0667D0',
			padding: '1rem 0',
			borderTop: '0.0625rem solid #4f7aaa',
		}
	}
	
	if(props.styles) {
		styles = props.styles
	}
	
	const prefixer = new Prefixer()
	styles = prefixer.prefix(styles)

    return styles
}