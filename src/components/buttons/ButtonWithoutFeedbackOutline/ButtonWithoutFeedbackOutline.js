import React from 'react'
import { TouchableWithoutFeedback, Text, View } from 'react-native'
import Style from './style'

export class ButtonWithoutFeedbackOutline extends React.Component {

    getBorderLeftRadius = () => {
        if (this.props.borderLeftRadius == 0)
            return 0
        else
            return this.props.borderLeftRadius || this.props.borderRadius
    }

    getBorderRightRadius = () => {
        if (this.props.borderRightRadius == 0)
            return 0
        else
            return this.props.borderRightRadius || this.props.borderRadius
    }

    render() {
        return (
            <TouchableWithoutFeedback
                disabled={this.props.disabled}
                onPress={this.props.onPress}
            >
                <View style={[
                    Style.button,
                    {
                        borderColor: this.props.disabled ?
                            this.props.style.theme.lightPrimaryColor.backgroundColor :
                            this.props.style.theme.defaultPrimaryColor.backgroundColor,
                        margin: this.props.margin || 0,
                        minHeight: this.props.height || 35,
                        borderRadius: this.props.borderRadius,
                        borderTopLeftRadius: this.getBorderLeftRadius(),
                        borderBottomLeftRadius: this.getBorderLeftRadius(),
                        borderTopRightRadius: this.getBorderRightRadius(),
                        borderBottomRightRadius: this.getBorderRightRadius()
                    }
                ]}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode={"tail"}
                        style={[
                            {
                                fontSize: this.props.fontSize ||
                                    this.props.style.fontSize.h8.fontSize,
                                color: this.props.disabled ?
                                this.props.style.theme.lightPrimaryColor.backgroundColor :
                                this.props.style.theme.defaultPrimaryColor.backgroundColor
                            },
                            Style.text
                        ]}
                    >
                        {this.props.text}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}