import reducers from '../../components/Breakpoint/store/reducers'

const initialState = {
    breakpoint: 'large'
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_BREAKPOINT':
            return reducers.setBreakpoint(state, action)
        default:
            return state
    }
}
