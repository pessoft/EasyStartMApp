import React from 'react'
import { TouchableHighlight } from 'react-native'
import Style from './style'
import { getSVGColor } from '../../../helpers/color-helper'

export class IconButton extends React.Component {
    constructor(props) {
        super(props)

        this.defaultColor = '#000'
    }

    renderIcon() {
        const Icon = this.props.icon

        return <Icon
            key={new Date().getTime().toString()}
            width={this.props.size}
            height={this.props.size}
            color={getSVGColor(this.props.color)} />
    }

    isNonBorder = () => {
        if (this.props.nonBorder)
            return {
                borderWidth: 0,
                padding: 0
            }
        return {}
    }

    onPress = () => {
        if (!this.props.disabled && this.props.onPress)
            this.props.onPress()
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
                onPress={this.onPress} >
                {this.renderIcon()}
            </TouchableHighlight>
        )
    }
}