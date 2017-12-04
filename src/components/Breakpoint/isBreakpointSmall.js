export default function isBreakpointSmall(breakpoint) {
	if(breakpoint) {
		if(breakpoint == 'small' || breakpoint == 'xsmall') {
	        return true
	    }
	}

    return false
}
