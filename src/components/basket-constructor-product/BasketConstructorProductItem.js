import React from 'react'
import {
    ScrollView,
    TouchableHighlight,
    Image,
    Text,
    View,
    Animated,
} from 'react-native'
import Style from './style'
import { ShoppingButton } from '../buttons/ShoppingButton/ShoppingButton';
import { timingAnimation } from '../../animation/timingAnimation'
import { TrashButton } from '../buttons/Square/TrashButton'

export class BasketConstructorProductItem extends React.Component {
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
            this.setState({ showScaleAnimation: new Animated.Value(1) })
    }

    onToggleProduct = countProduct => {
        if (countProduct == 0) {
            this.onPressTrash()
        } else if (this.props.onToggleProduct) {
            const basketProduct = {
                uniqId: this.props.uniqId,
                count: countProduct,
            }
            this.props.onToggleProduct(basketProduct)
        }
    }

    onPressTrash = () => {
        if (this.props.onToggleProduct) {
            const basketProduct = {
                uniqId: this.props.uniqId,
                count: 0
            }
            const duration = this.props.animation && this.props.animation.useAnimation ? this.props.animation.duration : 150
            const callbackFinishAnimation = () => this.props.onToggleProduct(basketProduct)

            timingAnimation(this.state.showScaleAnimation, 0, duration, true, callbackFinishAnimation)
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
                    { opacity: this.state.showScaleAnimation },
                    { transform: [{ scale: this.state.showScaleAnimation }] }]}>
                    <View style={Style.imageContainer}>
                        <Image
                            source={this.props.product.imageSource}
                            style={Style.productImage}
                        />
                        <Text style={[
                            Style.price,
                            this.props.style.theme.primaryTextColor,
                            this.props.style.fontSize.h8]}>
                            {`${this.props.product.price} ${this.props.product.currencyPrefix}`}
                        </Text>
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
                        {
                            this.props.product.ingredients.map(p => <Text
                                key={new Date().getTime().toString()}
                                style={[
                                    Style.ingredient,
                                    this.props.style.theme.secondaryTextColor,
                                    this.props.style.fontSize.h10]}>
                                {p}
                            </Text>)
                        }
                        <View style={Style.blockShopAction}>
                            <TrashButton
                                size={20}
                                underlayColor={this.props.style.theme.secondaryTextColor.color}
                                color={this.props.style.theme.textPrimaryColor.color}
                                borderColor={this.props.style.theme.dividerColor.borderColor}
                                backgroundColor={this.props.style.theme.secondaryTextColor.color}
                                onPress={this.onPressTrash} />
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