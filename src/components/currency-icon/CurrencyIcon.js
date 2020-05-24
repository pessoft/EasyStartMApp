import React from 'react'
import { View, Text } from 'react-native'
import { CurrencyType } from '../../helpers/currency/currency-type'
import { getCurrencyPrefix } from '../../helpers/currency/currency-helper'
import { getSVGColor } from '../../helpers/color-helper'
import Ruble from '../../images/font-awesome-svg/ruble-sign.svg'

export class CurrencyIcon extends React.Component {

    renderTextIcon = () => {
        const currencyLabel = getCurrencyPrefix(this.props.currencyType)

        return (
            <Text
                key={this.props.key}
                style={[
                    {
                        color: this.props.color,
                        fontSize: this.props.width
                    },
                    { ...this.props.style }
                ]}>
                {currencyLabel}
            </Text>
        )
    }

    getCurrencyIcon = () => {
        switch (this.props.currencyType) {
            case CurrencyType.Ruble:
                return <Ruble {...this.props} color={getSVGColor(this.props.color)}/>
            case CurrencyType.Lei:
                return this.renderTextIcon()
        }
    }

    render() {
        return this.getCurrencyIcon()
    }
}