import React from 'react'
import { TouchableWithoutFeedback, Text, View } from 'react-native'
import Style from './style'

export class SimpleTextButton extends React.Component {

    render() {
        return (
            <TouchableWithoutFeedback
                disabled={this.props.disabled}
                onPress={this.props.onPress}
            >
                <View style={[
                    Style.button,
                    {
                        margin: this.props.margin || 0,
                    }]}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode={"tail"}
                        style={{
                            flex: 1,
                            paddingHorizontal: 0,
                            fontSize: this.props.sizeText || 14,
                            color: this.props.disabled ?
                                this.props.disabledColor || 'gray' :
                                this.props.color || 'blue',
                            textAlign: this.props.textAlign || 'center',
                        }}>
                        {this.props.text}
                    </Text>
                </View>
            </TouchableWithoutFeedback >
        )
    }
}