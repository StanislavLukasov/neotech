import Prefixer from 'inline-style-prefixer'

export default function styles(props) {
	let styles = {
		loading: {
			width: '5rem',
			margin: '4rem auto',
			display: 'block'
		},
		error: {
			padding: '5rem',
			textAlign: 'center'
		},
		container: {
			marginTop: '1rem',
			background: 'white',
			padding: '1rem 0',
			border: '0.065rem solid #DAE1E9',
			borderRadius: '0.3rem'
		},
		doubleConteent: {
			container: {
				display: 'flex'
			},
			containerLeft: {
				width: '50%',
				padding: '0 1.5rem'
			},
			containerRight: {
				width: '50%',
				padding: '0 1.5rem'
			},
			containerSmall: {
				width: '100%'
			}
		},
		form: {
			container: {
				display: 'flex'
			},
			columnLeft: {
				width: '50%',
				padding: '0 1rem 0 0'
			},
			columnRight: {
				width: '50%',
				padding: '0 0 0 1rem'
			},
			columnSmall: {
				width: '100%'
			},
			select: {
				width: '100%',
				padding: '0.5rem',
				margin: '0 0 1rem 0',
				border: '0.065rem solid #DAE1E9',
				color: '#666666',
				backgroundColor: 'transparent',
				fontSize: '1rem',
				WebkitAppearance: 'none',
				MozAppearance: 'none',
				backgroundImage: 'url(/images/arrow-down.svg)' || 'none',
				backgroundRepeat: 'no-repeat',
				backgroundSize: '0.75rem',
				backgroundPosition: 'right 0.5rem top 50%',
				cursor: 'pointer',
				outline: 'none',
				borderRadius: 0
			},
			input: {
				width: '100%',
				padding: '0.5rem',
				border: '0.065rem solid #DAE1E9',
				color: '#666666',
				outline: 'none',
				fontSize: '1rem'
			},
			inputError: {
				borderColor: 'red'
			},
			paragraph: {
				fontSize: '0.85rem',
				color: '#666666'
			},
			icon: {
				width: '1rem',
				margin: '1rem',
				display: 'inline-block',
				verticalAlign: 'top'
			},
			span: {
				display: 'inline-block',
				verticalAlign: 'top'
			},
			radio: {
				cursor: 'pointer'
			},
			iconContainer: {
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				margin: 'auto'	
			},
			radioContainer: {
				margin: 'auto',
				textAlign: 'center',
				padding: '2rem 0'
			},
			checkboxContainer: {
				display: 'flex',
				alignItems: 'center'
			},
			checkbox: {
				cursor: 'pointer'
			}
		},
		rates: {
			container: {
				padding: '0 1rem',
				border: '0.065rem solid #DAE1E9',
			},
			ul: {
				margin: 0,
				padding: 0,
				listStyle: 'none'
			},
			li: {
				display: 'flex',
				alignItems: 'center',
				padding: '1rem 0',
				borderBottom: '0.065rem solid #DAE1E9'
			},
			liLastChild: {
				borderBottom: 0
			},
			icon: {
				width: '2rem'
			},
			span: {
				display: 'block',
				fontSize: '1rem',
				margin: '0 0 0 1rem'
			},
			spanLight: {
				color: '#BDBDBD',
				fontSize: '0.85rem'
			},
			bitcoin: {
				width: '1.5rem'
			},
			orderText: {
				display: 'flex',
				alignItems: 'center',
				margin: '0 0 1rem 0',
			},
			text: {
				margin: '1rem 0 0.5rem 0',
				display: 'block'
			},
			orderTextRate: {
				paddingLeft: '0.5rem'
			}
		},
		submitButtonWithValidation: {
			container: {
				padding: '1.5rem 0 0',
				textAlign: 'right',
				borderTop: '0.065rem solid #DAE1E9'
			},
			buttonContainer: {
				display: 'inline-block'
			},
			button: {
				outline: 'none',
				background: 'green',
				border: 0,
				cursor: 'pointer',
				color: 'white',
				fontSize: '1rem',
				marginRight: '1.5rem',
				textTransform: 'capitalize',
				display: 'flex',
				alignItems: 'center',
				marginLeft: 'auto'
			},
			buttonDisabled: {
				background: '#C2C2C2'
			},
			icon: {
				width: '0.85rem',
				margin: '1rem 0.5rem 1rem 1rem'
			},
			span: {
				margin: '1rem 1rem 1rem 0.5rem'
			}
		},
		validationError: {
			float: 'left',
			padding: '0 1.5rem',
			color: 'red'
		},
		validationErrorSmall: {
			float: 'none',
			display: 'block',
			marginBottom: '1.5rem'
		},
		results: {
			container: {
				wdith: '100%',
				textAlign: 'center',
				padding: '5rem 1.5rem'
			},
			icon: {
				width: '4rem'
			},
			text: {
				margin: '2rem 0'
			},
			button: {
				outline: 'none',
				background: 'transparent',
				border: '0.065rem solid #DAE1E9',
				cursor: 'pointer',
				color: '#333',
				fontSize: '0.85rem',
				textTransform: 'capitalize',
				padding: '1rem'
			}
		}
	}
	
	if(props.styles) {
		styles = props.styles
	}
	
	const prefixer = new Prefixer()
	styles = prefixer.prefix(styles)

    return styles
}