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
                count: countProduct,
                index: this.props.product.index
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
            <Animated.View style={[
                { opacity: this.state.showScaleAnimation },
                { transform: [{ scale: this.state.showScaleAnimation }] }]}>
                <TouchableHighlight
                    underlayColor={this.props.style.theme.backdoor.backgroundColor}
                    style={[
                        Style.bodyItem,
                        this.props.style.theme.backdoor,
                        this.props.style.theme.shadowColor,
                    ]}
                    onPress={this.onPress}>
                    <View style={[
                        Style.directionRow
                    ]}>
                        <View style={Style.imageContainer}>
                            <Image
                                source={this.props.product.imageSource}
                                style={Style.productImage}
                            />
                        </View>
                        <View style={[
                            Style.productHeader,
                            this.props.style.theme.dividerColor]}>
                            <View style={[Style.captionBlock]}>
                                <Text
                                    numberOfLines={2}
                                    ellipsizeMode={"tail"}
                                    style={[
                                        Style.textWrap,
                                        this.props.style.fontSize.h8,
                                        this.props.style.theme.primaryTextColor]}>
                                    {this.props.product.caption.trimStart()}
                                </Text>

                                <Text style={[
                                    Style.mt_5,
                                    this.props.style.theme.secondaryTextColor,
                                    this.props.style.fontSize.h10]}>
                                    {`${this.props.product.price} ${this.props.product.currencyPrefix}`}
                                </Text>
                            </View>
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
                    </View>
                </TouchableHighlight>
            </Animated.View>
        )
    }
}