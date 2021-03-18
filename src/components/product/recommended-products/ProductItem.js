import React from 'react'
import {
    TouchableHighlight,
    Image,
    Text,
    View,
    Animated,
    Dimensions
} from 'react-native'
import Style from './product-item-style'
import { ShoppingButton } from '../../buttons/ShoppingButton/ShoppingButton';
import { timingAnimation } from '../../../animation/timingAnimation'
import { getProductTypes } from '../../../helpers/product';
import { TypeProduct } from '../../../helpers/type-product';
import { ProductAdditionalInfoType, ProductAdditionalInfoTypeShortName } from '../../../helpers/product-additional-option';


const min320 = Dimensions.get('window').width <= 320

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
            this.props.onPress(this.props.product.Id)
    }

    onToggleProduct = countProduct => {
        const basketProduct = {
            id: this.props.product.Id,
            categoryId: this.props.product.CategoryId,
            count: 1,
            index: this.props.product.OrderNumber - 1,
            withOptions: this.props.product.ProductAdditionalOptionIds.length != 0
        }

        if (this.props.onToggleProduct) {
            this.props.onToggleProduct(basketProduct)
        }
    }

    getSizeProductType = type => {
        if (type == TypeProduct.Hit
            || type == TypeProduct.New) {
            return { width: 22, height: 22 }
        }

        return { width: 15, height: 15 }
    }

    getProductAdditionalInfo = product => {
        let additionInfo
        if (product.ProductAdditionalInfoType != ProductAdditionalInfoType.Custom) {
            let value = parseFloat(product.AdditionInfo)
            if (product.ProductAdditionalOptionIds.length != 0) {
                for (const optionId of product.ProductAdditionalOptionIds) {
                    const productOptions = this.props.additionalOptions[optionId]
                    const defaultOption = productOptions.Items.find(p => p.IsDefault)

                    value += defaultOption.AdditionalInfo
                }
            }

            additionInfo = `${value} ${ProductAdditionalInfoTypeShortName[product.ProductAdditionalInfoType]}`
        } else
            additionInfo = product.AdditionInfo

        return additionInfo
    }

    render() {
        return (
            <TouchableHighlight
                underlayColor={this.props.style.theme.backdoor.backgroundColor}
                style={[
                    { backgroundColor: this.props.backgroundColor ?? this.props.style.theme.backdoor.backgroundColor },
                    Style.bodyItem
                ]}
                onPress={this.onPress}>
                <Animated.View style={[
                    Style.directionRow,
                    { transform: [{ scale: this.state.showScaleAnimation }] }]}>
                    <View style={Style.imageContainer}>
                        <Image
                            source={this.props.product.Image}
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
                                    min320 ?
                                        this.props.style.fontSize.h9 :
                                        this.props.style.fontSize.h8,
                                    this.props.style.theme.primaryTextColor]}>
                                {this.props.product.Name.trimStart()}
                            </Text>
                            <View style={[
                                Style.rowWrap
                            ]}>
                                <Text style={[
                                    Style.mt_5,
                                    this.props.style.theme.secondaryTextColor,
                                    this.props.style.fontSize.h10]}>
                                    {this.getProductAdditionalInfo(this.props.product)}
                                </Text>
                                <View style={Style.productTypeContainer}>
                                    {
                                        getProductTypes(this.props.product.ProductType, this.props.style.theme).map(p => {
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

                            </View>
                        </View>
                        <View style={Style.blockShopAction}>
                            <Text style={[
                                Style.textWrap,
                                this.props.style.fontSize.h8,
                                this.props.style.theme.primaryTextColor]}>
                                {`${this.props.product.Price} ${this.props.currencyPrefix}`}
                            </Text>
                            <View style={Style.blockShopButtons}>
                                <ShoppingButton
                                    startCount={this.props.product.startCount}
                                    limit={1}
                                    maxCount={1}
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