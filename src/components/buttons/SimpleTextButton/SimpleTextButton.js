import React from 'react'
import { TouchableWithoutFeedback, Text } from 'react-native'

export class SimpleTextButton extends React.Component {

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <Text style={{
                    fontSize: this.props.sizeText || 14,
                    color:this.props.color || 'blue'
                }}>
                    {this.props.text}
                </Text>
            </TouchableWithoutFeedback>
        )
    }
}