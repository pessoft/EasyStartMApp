import React from 'react'
import { IconButton } from './IconButton'
import ShoppingBasketIco from '../../../images/font-awesome-svg/shopping-basket.svg'

export class BasketButton extends React.Component {
    render() {
        return (
            <IconButton
                {...this.props}
                icon={ShoppingBasketIco}
            />
        )
    }
}