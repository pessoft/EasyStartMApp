import React from 'react'
import { SimpleTextButton } from '../SimpleTextButton/SimpleTextButton'
import { connect } from 'react-redux'
import { CASHBACK_PROFILE } from '../../../navigation/pointsNavigate'

class VirtualMoneyButton extends React.Component {
    // goToCashbackScreen = () => this.props.navigation.navigate(CASHBACK_PROFILE)

    render() {
        return <SimpleTextButton
            // onPress={this.goToCashbackScreen}
            sizeText={this.props.style.fontSize.h10.fontSize}
            margin={5}
            color={this.props.style.theme.textPrimaryColor.color}
            text={`${this.props.virtualMoney} ${this.props.currencyPrefix}`} />
    }
}

const mapStateToProps = state => {
    return {
        virtualMoney: state.user.virtualMoney,
        currencyPrefix: state.appSetting.currencyPrefix,
        style: state.style,
    }
}

export default connect(mapStateToProps)(VirtualMoneyButton)