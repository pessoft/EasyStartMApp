import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableHighlight } from 'react-native'
import Styles from './style'

export class IconButton extends React.Component {
    renderIcon() {
        const Icon = this.props.icon

        return <Icon
            width={this.props.size}
            height={this.props.size}
            color={this.props.color || '#000'} />
    }

    render() {
        return (
            <TouchableHighlight
                style={Styles.iconSquareButton}
                onPress={this.props.onPress} >
                {this.renderIcon()}
            </TouchableHighlight>
        )
    }
}