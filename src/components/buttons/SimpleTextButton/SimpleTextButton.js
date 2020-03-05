import React from 'react'
import { TouchableWithoutFeedback, Text } from 'react-native'

export class SimpleTextButton extends React.Component {

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <Text
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                    style={{
                        fontSize: this.props.sizeText || 14,
                        color: this.props.color || 'blue',
                        textAlign: 'center',
                        margin: this.props.margin || 0,
                    }}>
                    {this.props.text}
                </Text>
            </TouchableWithoutFeedback>
        )
    }
}