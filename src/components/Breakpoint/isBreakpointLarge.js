export default function isBreakpointLarge(breakpoint) {
	if(breakpoint) {
		if(breakpoint == 'small' || breakpoint == 'xsmall' || breakpoint == 'medium' || breakpoint == 'large') {
	        return true
	    }
	}

    return false
}
