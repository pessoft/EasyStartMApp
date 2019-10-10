import React from 'react'
import {
    TouchableHighlight,
    Image,
    Text,
    View,
    Animated,
} from 'react-native'
import Style from './style'
import { ShoppingButton } from '../buttons/ShoppingButton/ShoppingButton';
import { timingAnimation } from '../../animation/timingAnimation'

export class ProductItem extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            showScaleAnimation: new Animated.Value(0)
        }
    }

    componentDidMount() {
        if (this.props.animation &&
            this.props.animation.useAnimation)
            timingAnimation(this.state.showScaleAnimation, 1, this.props.animation.duration, true)
        else
            this.setState({ showScaleAnimation: 1 })
    }

    onPress = () => {
        if (this.props.onPress)
            this.props.onPress(this.props.id)
    }

    onToggleProduct = countProduct => {
        const basketProduct = {
            id: this.props.id,
            count: countProduct
        }

        if (this.props.onToggleProduct) {
            this.props.onToggleProduct(basketProduct)
        }
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor={this.props.style.theme.backdoor.backgroundColor}
                style={Style.bodyItem}
                onPress={this.onPress}>
                <Animated.View style={[
                    Style.directionRow,
                    { transform: [{ scale: this.state.showScaleAnimation }] }]}>
                    <View style={Style.imageContainer}>
                        <Image
                            source={this.props.product.imageSource}
                            style={Style.productImage}
                        />
                    </View>
                    <View style={[
                        Style.productHeader,
                        this.props.style.theme.dividerColor]}>
                        <Text style={[
                            Style.textWrap,
                            this.props.style.fontSize.h8,
                            this.props.style.theme.primaryTextColor]}>
                            {this.props.product.caption}
                        </Text>

                        <Text style={[
                            Style.mt_5,
                            this.props.style.theme.secondaryTextColor,
                            this.props.style.fontSize.h11]}>
                            {this.props.product.additionInfo}
                        </Text>

                        <View style={Style.blockShopAction}>
                            <Text style={[
                                Style.textWrap,
                                this.props.style.fontSize.h9,
                                this.props.style.theme.primaryTextColor]}>
                                {`${this.props.product.price} ${this.props.product.currencyPrefix}`}
                            </Text>
                            <View style={Style.blockShopButtons}>
                                <ShoppingButton
                                    startCount={this.props.product.startCount}
                                    size={20}
                                    underlayColor={this.props.style.theme.lightPrimaryColor.backgroundColor}
                                    color={this.props.style.theme.textPrimaryColor.color}
                                    tintColor={this.props.style.theme.primaryTextColor.color}
                                    borderColor={this.props.style.theme.dividerColor.borderColor}
                                    backgroundColor={this.props.style.theme.accentColor.backgroundColor}
                                    onPress={this.onToggleProduct} />
                            </View>
                        </View>
                    </View>
                </Animated.View>
            </TouchableHighlight>
        )
    }
}