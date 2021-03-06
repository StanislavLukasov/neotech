import { connect } from 'react-redux'
import App from './app'

const mapStateToProps = state => ({ state })
const mapDispatchToProps = dispatch => ({ dispatch })
const mergeProps = ({ state }, { dispatch }, ownProps) => {

    const { breakpoint, funds } = state

    return Object.assign({}, ownProps, {
        breakpoint: breakpoint.breakpoint,
        availableFunds: funds.availableFunds,
        dispatch
    })
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App)
