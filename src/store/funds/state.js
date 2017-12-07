import reducers from './reducers'

const initialState = {
    availableFunds: 120
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_AVAILABLE_FUNDS':
            return reducers.setAvailableFunds(state, action)
        default:
            return state
    }
}
