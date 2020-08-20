import React from 'react'
import { TouchableWithoutFeedback, Text, View } from 'react-native'
import Style from './style'

export class ButtonWithoutFeedback extends React.Component {

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

    getBackgroundColor = () => {
        let backgroundColor = this.props.disabled ?
            this.props.style.theme.lightPrimaryColor.backgroundColor :
            this.props.style.theme.defaultPrimaryColor.backgroundColor

        if (this.props.backgroundColor)
            backgroundColor = this.props.backgroundColor

        return backgroundColor
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
                        backgroundColor: this.getBackgroundColor(),
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
                                    this.props.style.fontSize.h8.fontSize
                            },
                            this.props.style.theme.textPrimaryColor,
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