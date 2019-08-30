import React from 'react'
import { IconButton } from './IconButton'
import ShoppingBasket from '../../images/font-awesome-svg/shopping-basket.svg'

export class BasketButton extends React.Component {
    render() {
        return (
            <IconButton
                {...this.props}
                icon={ShoppingBasket}
                onPress={this.props.onPress}
            />
        )
    } sss
}