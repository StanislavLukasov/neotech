class BreakpointActions {
    setBreakpoint(breakpoint) {
        return {
            type: 'SET_BREAKPOINT',
            breakpoint
        }
    }
}

export default new BreakpointActions()
