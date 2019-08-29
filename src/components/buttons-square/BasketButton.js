import React from 'react'
import {IconButton} from './IconButton'

export class BasketButton extends React.Component {
    render() {
        return (
            <IconButton
                size={18}
                iconName={'shopping-basket'}
                onPress={this.props.onPress}
            />
        )
    }sss
}