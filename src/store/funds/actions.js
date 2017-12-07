class FundsActions {
    setAvailableFunds(availableFunds) {
        return {
            type: 'SET_AVAILABLE_FUNDS',
            availableFunds
        }
    }
}

export default new FundsActions()
