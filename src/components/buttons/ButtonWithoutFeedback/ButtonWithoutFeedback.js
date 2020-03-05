import React from 'react'
import { TouchableWithoutFeedback, Text, View } from 'react-native'
import Style from './style'

export class ButtonWithoutFeedback extends React.Component {

    render() {
        return (
            <TouchableWithoutFeedback
                disabled={this.props.disabled}
                onPress={this.props.onPress}
            >
                <View style={[
                    Style.button,
                    {
                        backgroundColor: this.props.disabled ?
                            this.props.style.theme.lightPrimaryColor.backgroundColor :
                            this.props.style.theme.defaultPrimaryColor.backgroundColor,
                        margin: this.props.margin || 0,
                        borderRadius: this.props.borderRadius
                    }
                ]}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode={"tail"}
                        style={[
                            this.props.style.fontSize.h8,
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