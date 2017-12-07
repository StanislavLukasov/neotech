class FundsReducers {
    setAvailableFunds (state, action) {
        const availableFunds = action.availableFunds
        const nextState = Object.assign({}, state, {
            availableFunds
        })
        return nextState
    }
}

export default new FundsReducers()
