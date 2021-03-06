import React from 'react'
import {
    TouchableHighlight,
    Image,
    Text,
    View,
    Animated,
    Dimensions
} from 'react-native'
import Style from './style-grid-item'
import { BasketButton } from '../buttons/Square/BasketButton'
import { timingAnimation, timingAnimationParallel } from '../../animation/timingAnimation'
import { springAnimationParallel } from '../../animation/springAnimation'
import { getProductTypes } from '../../helpers/product';
import { TypeProduct } from '../../helpers/type-product';


const min320 = Dimensions.get('window').width <= 320
let width = Dimensions.get('screen').width / 2 - 75

export class ProductItemGridWithOptions extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            showScaleAnimation: new Animated.Value(0),
            toggleBottomPriceAnimation: this.props.product.startCount == 0 ? new Animated.Value(1) : new Animated.Value(0),
            showBottomPrice: this.props.product.startCount == 0,
            // width: this.props.product.startCount == 0 ? new Animated.Value(width) : new Animated.Value(0),
            width: this.props.product.startCount == 0 ? new Animated.Value(1) : new Animated.Value(0),
        }
    }

    componentDidMount() {
        if (this.props.animation &&
            this.props.animation.useAnimation)
            timingAnimation(this.state.showScaleAnimation, 1, this.props.animation.duration, true)
        else
            this.setState({ showScaleAnimation: 1 })
    }

    showPriceBottom = (action) => {
        this.setState({ showBottomPrice: true },
            () => {
                Animated.parallel([
                    timingAnimationParallel(this.state.toggleBottomPriceAnimation, 1, 200),
                    timingAnimationParallel(this.state.width, 1, 200)
                ]).start(action)
            }
        )

    }

    hidePriceBottom = (action) => {
        Animated.parallel([
            timingAnimationParallel(this.state.toggleBottomPriceAnimation, 0, 200),
            timingAnimationParallel(this.state.width, 0, 200),
        ]).start(
            () => this.setState({ showBottomPrice: false }, action)
        )

    }

    onPress = () => {
        if (this.props.onPress)
            this.props.onPress(this.props.id)
    }

    onToggleProduct = () => {
        if (this.props.onToggleProduct)
            this.props.onToggleProduct(this.props.id)
    }

    getSizeProductType = type => {
        if (type == TypeProduct.Hit
            || type == TypeProduct.New) {
            return { width: 22, height: 22 }
        }

        return { width: 15, height: 15 }
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor={this.props.style.theme.backdoor.backgroundColor}
                style={[
                    { backgroundColor: this.props.backgroundColor ?? this.props.style.theme.backdoor.backgroundColor },
                    Style.bodyItem,
                    this.props.style.theme.shadowColor,
                ]}
                onPress={this.onPress}>
                <Animated.View style={[
                    Style.directionRow,
                    { transform: [{ scale: this.state.showScaleAnimation }] }]}>
                    <View style={Style.imageContainer}>
                        <Image
                            source={this.props.product.imageSource}
                            style={Style.productImage}
                        />
                        {
                            this.props.product.startCount > 0 &&
                            <View
                                style={[
                                    Style.priceInImage,
                                    this.props.style.theme.backdoorTransparent
                                ]}>
                                <Text style={[
                                    this.props.style.theme.dividerColor,
                                    Style.textWrap,
                                    this.props.style.fontSize.h8,
                                    this.props.style.theme.primaryTextColor]}>
                                    {`${this.props.product.price} ${this.props.product.currencyPrefix}`}
                                </Text>
                            </View>
                        }
                        {
                            this.props.product.productType != TypeProduct.Normal &&
                            <View style={[
                                Style.productTypeContainer,
                                this.props.style.theme.backdoorTransparent
                            ]}>
                                {
                                    getProductTypes(this.props.product.productType, this.props.style.theme).map(p => {
                                        const Icon = p.icon
                                        const key = new Date().getTime().toString() + p.type
                                        const { width, height } = this.getSizeProductType(p.type)
                                        return (
                                            <View key={key} style={Style.productType}>
                                                <Icon
                                                    color={p.color}
                                                    width={width}
                                                    height={height} />
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        }

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
                                    min320 ?
                                        this.props.style.fontSize.h10 :
                                        this.props.style.fontSize.h9,
                                    this.props.style.theme.primaryTextColor]}>
                                {this.props.product.caption.trimStart()}
                            </Text>
                            <View style={[
                                Style.rowWrap
                            ]}>
                                <Text
                                    numberOfLines={1}
                                    ellipsizeMode={"tail"}
                                    style={[
                                        Style.mt_5,
                                        this.props.style.theme.secondaryTextColor,
                                        this.props.style.fontSize.h11]}>
                                    {this.props.product.additionInfo}
                                </Text>


                            </View>
                        </View>
                        <View style={Style.blockShopAction}>
                            {

                                this.state.showBottomPrice &&
                                <Animated.View
                                    style={[
                                        {
                                            opacity: this.state.toggleBottomPriceAnimation,
                                            flex: this.state.width,
                                            transform: [{ scale: this.state.toggleBottomPriceAnimation }]
                                        },
                                    ]}>
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode={"tail"}
                                        style={[
                                            Style.textWrap,
                                            this.props.style.fontSize.h8,
                                            this.props.style.theme.primaryTextColor]}>
                                        {`${this.props.product.price} ${this.props.product.currencyPrefix}`}
                                    </Text>
                                </Animated.View>
                            }

                            <View style={[
                                Style.blockShopButtons,
                            ]}>
                                <BasketButton
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