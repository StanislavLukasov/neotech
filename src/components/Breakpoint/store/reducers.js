class BreakpointReducers {
    setBreakpoint (state, action) {
        const breakpoint = action.breakpoint
        const nextState = Object.assign({}, state, {
            breakpoint
        })
        return nextState
    }
}

export default new BreakpointReducers()
