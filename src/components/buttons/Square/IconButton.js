import React from 'react'
import { TouchableHighlight } from 'react-native'
import Style from './style'
import { processColor, Platform } from 'react-native'

export class IconButton extends React.Component {
    constructor(props) {
        super(props)

        this.defaultColor = '#000'
    }

    getColor = color => {
        if (Platform.OS === 'ios') {
            return processColor(color)
        }

        return color
    }

    renderIcon() {
        const Icon = this.props.icon

        return <Icon
            width={this.props.size}
            height={this.props.size}
            color={this.getColor(this.props.color) || this.getColor(this.defaultColor)} />
    }

    isNonBorder = () => {
        if (this.props.nonBorder)
            return {
                borderWidth: 0,
                padding: 0
            }
        return {}
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor={this.props.underlayColor}
                style={[
                    Style.iconSquareButton,
                    this.isNonBorder(),
                    {
                        borderColor: this.props.borderColor || this.defaultColor,
                        backgroundColor: this.props.backgroundColor
                    }]}
                onPress={this.props.onPress} >
                {this.renderIcon()}
            </TouchableHighlight>
        )
    }
}