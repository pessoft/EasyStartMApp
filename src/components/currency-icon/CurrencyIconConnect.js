import React from 'react'
import { connect } from 'react-redux'
import { CurrencyIcon } from './CurrencyIcon'

class CurrencyIconConnect extends React.Component {

    render() {
        return <CurrencyIcon {...this.props}/>
    }
}

const mapStateToProps = state => {
    return {
        currencyType: state.appSetting.currencyType,
    }
}

export default connect(mapStateToProps)(CurrencyIconConnect)