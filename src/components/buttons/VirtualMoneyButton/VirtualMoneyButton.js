import React from 'react'
import { SimpleTextButton } from '../SimpleTextButton/SimpleTextButton'
import { connect } from 'react-redux'
import { CASHBACK_PROFILE } from '../../../navigation/pointsNavigate'
import { View } from 'react-native'
import Ruble from '../../../images/font-awesome-svg/ruble-sign.svg'
import { getSVGColor } from '../../../helpers/color-helper'
import Style from './style'

class VirtualMoneyButton extends React.Component {
    // goToCashbackScreen = () => this.props.navigation.navigate(CASHBACK_PROFILE)

    render() {
        if (!this.props.promotionCashbackSetting.IsUseCashback)
            return null;

        return (
            <View style={Style.moneyBody}>
                <SimpleTextButton
                    // onPress={this.goToCashbackScreen}
                    sizeText={this.props.style.fontSize.h7.fontSize}
                    color={this.props.style.theme.textPrimaryColor.color}
                    text={this.props.virtualMoney} />
                <Ruble
                    style={{ marginLeft: 2, marginTop: 2 }}
                    key={new Date().getTime().toString()}
                    width={this.props.style.fontSize.h8.fontSize}
                    height={this.props.style.fontSize.h8.fontSize}
                    color={getSVGColor(this.props.style.theme.textPrimaryColor.color)} />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        promotionCashbackSetting: state.main.promotionCashbackSetting,
        virtualMoney: state.user.virtualMoney,
        currencyPrefix: state.appSetting.currencyPrefix,
        style: state.style,
    }
}

export default connect(mapStateToProps)(VirtualMoneyButton)