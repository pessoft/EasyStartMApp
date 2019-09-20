import React from 'react'
import {
    ScrollView,
    TouchableHighlight,
    Image,
    Text,
    View,
    Animated,
} from 'react-native'
import Styles from './style'
import { ShoppingButton } from '../buttons/ShoppingButton/ShoppingButton';
import { timingAnimation } from '../../animation/timingAnimation'
import { TrashButton } from '../buttons/Square/TrashButton'

export class BasketProductItem extends React.Component {
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

    onPress = () => {
        if (this.props.onPress)
            this.props.onPress(this.props.id)
    }

    onToggleProduct = countProduct => {
        if (countProduct == 0) {
            this.onPressTrash()
        } else if (this.props.onToggleProduct) {
            const basketProduct = {
                id: this.props.id,
                count: countProduct
            }
            this.props.onToggleProduct(basketProduct)
        }
    }

    onPressTrash = () => {
        if (this.props.onToggleProduct) {
            const basketProduct = {
                id: this.props.id,
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
                underlayColor={this.props.style.theme.lightPrimaryColor.backgroundColor}
                style={Styles.bodyItem}
                onPress={this.onPress}>
                <Animated.View style={[
                    Styles.directionRow,
                    { opacity: this.state.showScaleAnimation },
                    { transform: [{ scale: this.state.showScaleAnimation }] }]}>
                    <View style={Styles.imageContainer}>
                        <Image
                            source={this.props.product.imageSource}
                            style={Styles.productImage}
                        />
                    </View>
                    <View style={[
                        Styles.productHeader,
                        this.props.style.theme.dividerColor]}>
                        <Text style={[
                            Styles.textWrap,
                            this.props.style.fontSize.h8,
                            this.props.style.theme.primaryTextColor]}>
                            {this.props.product.caption}
                        </Text>

                        <Text style={[
                            Styles.mt_5,
                            this.props.style.theme.secondaryTextColor,
                            this.props.style.fontSize.h10]}>
                            {`${this.props.product.price} ${this.props.product.currencyPrefix}`}
                        </Text>

                        <View style={Styles.blockShopAction}>
                            <TrashButton
                                size={20}
                                underlayColor={this.props.style.theme.themeBody.backgroundColor}
                                color={this.props.style.theme.textPrimaryColor.color}
                                borderColor={this.props.style.theme.dividerColor.borderColor}
                                backgroundColor={this.props.style.theme.secondaryTextColor.color}
                                onPress={this.onPressTrash} />
                            <View style={Styles.blockShopButtons}>
                                <ShoppingButton
                                    startCount={this.props.product.startCount}
                                    size={20}
                                    underlayColor={this.props.style.theme.lightPrimaryColor.backgroundColor}
                                    color={this.props.style.theme.textPrimaryColor.color}
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