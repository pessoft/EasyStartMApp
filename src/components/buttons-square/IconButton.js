import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { TouchableHighlight } from 'react-native'
import Styles from './style'

export class IconButton extends React.Component {
    render() {
        return (
            <TouchableHighlight style={Styles.iconSquareButton}>
            <Icon
                name={this.props.iconName}
                size={this.props.size}
                onPress={this.props.onPress} />
                </TouchableHighlight>
        )
    }
}