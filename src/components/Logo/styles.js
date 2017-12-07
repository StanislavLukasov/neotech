import Prefixer from 'inline-style-prefixer'

export default function styles(props) {
	let styles = {
		logo: {
			cursor: 'pointer',
			fontWeight: 'bold',
			color: 'white',
			fontSize: '1.4rem',
			padding: 0,
		}
	}
	
	if(props.styles) {
		styles = props.styles
	}
	
	const prefixer = new Prefixer()
	styles = prefixer.prefix(styles)

    return styles
}