import { connect } from 'react-redux'
import Header from './header'

const mapStateToProps = state => ({ state })
const mapDispatchToProps = dispatch => ({ dispatch })
const mergeProps = ({ state }, { dispatch }, ownProps) => {

    const { breakpoint, funds } = state

    return Object.assign({}, ownProps, {
        breakpoint: breakpoint.breakpoint,
        availableFunds: funds.availableFunds
    })
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Header)
