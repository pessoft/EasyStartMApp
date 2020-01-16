import React from 'react'
import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native'
import Style from './style'
import IconClose from '../../../../images/font-awesome-svg/times.svg'
import { getSVGColor } from '../../../../helpers/color-helper'
import { springAnimation } from '../../../../animation/springAnimation'

export class IngredientCounter extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            toggleAnimation: new Animated.Value(props.count > 0 ? 1 : 0)
        }
    }

    componentDidUpdate() {
        if (this.props.count == 1) {
            springAnimation(this.state.toggleAnimation, 1, 200, 7, true)
        } else if (this.props.count == 0) {
            springAnimation(this.state.toggleAnimation, 0, 200, 7, true)
        }
    }

    getCounterText = () => `x ${this.props.count}`

    render() {
        return (
            <Animated.View
                style={[
                    Style.container,
                    {
                        opacity: this.state.toggleAnimation,
                        transform: [{ scale: this.state.toggleAnimation }]
                    }
                ]}>
                <TouchableWithoutFeedback
                    onPress={this.props.onResetToZero}>
                    <View
                        style={Style.resetContainer}>
                        <IconClose
                            key={new Date().getTime().toString()}
                            width={20}
                            height={20}
                            color={getSVGColor(this.props.style.theme.errorTextColor.color)} />
                    </View>
                </TouchableWithoutFeedback>
                <View
                    style={[
                        Style.counterContainer,
                        this.props.style.theme.accentColor
                    ]}>
                    <Text
                        style={[
                            Style.fontBold,
                            this.props.style.fontSize.h8,
                            this.props.style.theme.textPrimaryColor
                        ]}>
                        {this.getCounterText()}
                    </Text>
                </View>
            </Animated.View>
        )
    }
}