import React from 'react'
import { TouchableHighlight } from 'react-native'
import Styles from './style'

export class IconButton extends React.Component {
    constructor(props) {
        super(props)

        this.defaultColor = '#000'
    }

    renderIcon() {
        const Icon = this.props.icon

        return <Icon
            width={this.props.size}
            height={this.props.size}
            color={this.props.color || this.defaultColor} />
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
                    Styles.iconSquareButton,
                    this.isNonBorder(),
                    {
                        borderColor: this.props.color || this.defaultColor,
                        backgroundColor: this.props.backgroundColor
                    }]}
                onPress={this.props.onPress} >
                {this.renderIcon()}
            </TouchableHighlight>
        )
    }
}