import React from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    Animated,
    Image,
    Dimensions
} from 'react-native'
import { SimpleTextButton } from '../../../components/buttons/SimpleTextButton/SimpleTextButton'
import { AirbnbRating } from 'react-native-ratings';
import { PRODUCT_REVIEW, PRODUCT_REVIEW_FROM_BASKET, PRODUCTS } from '../../../navigation/pointsNavigate'
import Style from './style'
import CommentLinesIcon from '../../../images/font-awesome-svg/comment-lines.svg'
import { timingAnimation } from '../../../animation/timingAnimation'
import { setSelectedProduct } from '../../../store/catalog/actions'
import { getSVGColor } from '../../../helpers/color-helper'
import { updateRating } from '../../../store/main/actions'
import { ProductAdditionalInfoType, ProductAdditionalInfoTypeShortName } from '../../../helpers/product-additional-option'
import { ShoppingButton } from '../../../components/buttons/ShoppingButton/ShoppingButton';
import { toggleProductInBasket } from '../../../store/basket/actions'

const min320 = Dimensions.get('window').width <= 320

class ProductInfoScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.getParam('productName', 'Блюдо'),
        }
    }

    constructor(props) {
        super(props)
        this.props.navigation.setParams({ productName: props.selectedProduct.Name })

        this.state = {
            showScaleAnimation: new Animated.Value(0),
            selectedProduct: props.selectedProduct,
            fromBasket: props.fromBasket,
            refreshItems: false,
            selectedCountProduct: this.getSelectedCountProduct(props.selectedProduct)
        }
    }

    componentDidMount() {
        timingAnimation(this.state.showScaleAnimation, 1, 300, true)

        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this.setState({ refreshItems: !this.state.refreshItems })
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    componentDidUpdate(prevProps) {
        const category = this.props.main.products[this.state.selectedProduct.CategoryId]
        const product = category.filter(p => p.Id == this.state.selectedProduct.Id)[0]

        if (product.Rating != this.state.selectedProduct.Rating) {
            this.setState({ selectedProduct: product })
        }

        if (this.state.refreshItems) {
            if (!this.props.selectedProduct ||
                Object.keys(this.props.selectedProduct).length == 0) {
                this.props.navigation.navigate(PRODUCTS)
            } else if (this.props.selectedProduct != prevProps.selectedProduct) {
                this.props.navigation.setParams({ productName: this.props.selectedProduct.Name })
            }

            this.setState({ refreshItems: false })
        }

        const selectedCountProduct = this.getSelectedCountProduct(this.state.selectedProduct)
        
        if (selectedCountProduct != this.state.selectedCountProduct)
            this.setState({ selectedCountProduct })
    }

    onToggleProduct = countProduct => {
        const id = this.state.selectedProduct.Id
        const productIndex = this.props.products[this.state.selectedProduct.CategoryId].findIndex(p => p.Id == id)
        const basketProductModify = { ...this.props.basketProducts }
        basketProductModify[id] = {
            categoryId: this.state.selectedProduct.CategoryId,
            count: countProduct,
            index: productIndex
        }

        this.props.toggleProductInBasket(basketProductModify)
    }

    getRatingText() {
        const ratingValue = parseFloat(this.state.selectedProduct.Rating.toFixed(1))
        return `Оценка: ${ratingValue} (голосов: ${this.state.selectedProduct.VotesCount})`
    }

    getPrice = () => {
        const product = this.state.selectedProduct
        let price = product.Price
        if (product.ProductAdditionalInfoType != ProductAdditionalInfoType.Custom) {
            if (product.ProductAdditionalOptionIds.length != 0) {
                for (const optionId of product.ProductAdditionalOptionIds) {
                    const productOptions = this.props.additionalOptions[optionId]
                    const defaultOption = productOptions.Items.find(p => p.IsDefault)

                    price += defaultOption.Price
                }
            }
        }

        return price
    }

    getPriceProduct() {
        return `${this.getPrice()} ${this.props.currencyPrefix}`
    }

    onPressReviews = () => {
        if (this.state.selectedProduct != this.props.selectedProduct) {
            this.props.setSelectedProduct(this.state.selectedProduct)
        }

        const nextScreen = this.state.fromBasket ? PRODUCT_REVIEW_FROM_BASKET : PRODUCT_REVIEW
        this.props.navigation.navigate(nextScreen)
    }

    onFinishRating = score => {
        if (!this.props.isLogin)
            return

        this.props.updateRating({
            clientId: this.props.clientId,
            productId: this.props.selectedProduct.Id,
            score: score
        })
    }

    getProductAdditionalInfo = () => {
        const product = this.state.selectedProduct
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

    getSelectedCountProduct = (selectedProduct) => {
        const productInfoFromBasket = this.props.basketProducts[selectedProduct.Id]

        return productInfoFromBasket ? productInfoFromBasket.count : 0
    }

    render() {
        return (
            <Animated.ScrollView
                key={this.state.selectedCountProduct.toString()}
                contentContainerStyle={{
                    paddingHorizontal: 12
                }}
                style={[
                    { opacity: this.state.showScaleAnimation },
                    { transform: [{ scale: this.state.showScaleAnimation }] }]}>
                <Image
                    style={Style.image}
                    source={this.state.selectedProduct.Image}
                />
                <View style={[
                    Style.contentBody,
                    this.props.style.theme.backdoor,
                    this.props.style.theme.shadowColor,
                ]}>
                    <View style={[
                        Style.productInfoContainer,
                        this.props.style.theme.dividerColor]}>
                        <View style={Style.leftBlock}>
                            <View style={Style.ratingBlock}>
                                <AirbnbRating
                                    ratingBackgroundColor={this.props.style.theme.themeBody.backgroundColor}
                                    size={28}
                                    fractions={1}
                                    showRating={false}
                                    defaultRating={this.state.selectedProduct.Rating}
                                    onFinishRating={this.onFinishRating}
                                    isDisabled={!this.props.isLogin}
                                />
                                <Text style={[
                                    min320 ? this.props.style.fontSize.h10 : this.props.style.fontSize.h9,
                                    this.props.style.theme.secondaryTextColor]}>{this.getRatingText()}
                                </Text>
                            </View>
                            <View style={Style.reviewsButtonWithIcon}>
                                <View style={Style.buttonContainer}>
                                    <SimpleTextButton
                                        text={'Отзывы'}
                                        onPress={this.onPressReviews}
                                        sizeText={this.props.style.fontSize.h6.fontSize}
                                        color={this.props.style.theme.accentOther.backgroundColor}
                                        textAlign={'left'}
                                    />
                                </View>
                                <CommentLinesIcon
                                    width={20}
                                    height={20}
                                    color={getSVGColor(this.props.style.theme.accentOther.backgroundColor)}
                                />
                            </View>
                        </View>
                        <View style={Style.rightBlock}>
                            <Text style={[
                                min320 ? this.props.style.fontSize.h6 : this.props.style.fontSize.h5,
                                this.props.style.theme.primaryTextColor]}>
                                {this.getPriceProduct()}
                            </Text>
                            <Text style={[
                                min320 ? this.props.style.fontSize.h10 : this.props.style.fontSize.h9,
                                this.props.style.theme.secondaryTextColor]}>
                                {this.getProductAdditionalInfo()}
                            </Text>
                            <View style={Style.basketBlock}>
                                <ShoppingButton
                                    startCount={this.state.selectedCountProduct}
                                    limit={this.props.limit}
                                    maxCount={this.props.maxCount}
                                    size={20}
                                    underlayColor={this.props.style.theme.lightPrimaryColor.backgroundColor}
                                    color={this.props.style.theme.textPrimaryColor.color}
                                    tintColor={this.props.style.theme.primaryTextColor.color}
                                    borderColor={this.props.style.theme.dividerColor.borderColor}
                                    backgroundColor={this.props.style.theme.accentColor.backgroundColor}
                                    onPress={this.onToggleProduct}
                                />
                            </View>
                        </View>
                    </View>
                    <Text style={[
                        Style.description,
                        this.props.style.fontSize.h8,
                        this.props.style.theme.secondaryTextColor]}>
                        {this.state.selectedProduct.Description}
                    </Text>
                </View>
            </Animated.ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        basketProducts: state.basket.basketProducts,
        serverDomain: state.appSetting.serverDomain,
        currencyPrefix: state.appSetting.currencyPrefix,
        selectedProduct: state.catalog.selectedProduct,
        isLogin: state.user.isLogin,
        main: state.main,
        fromBasket: state.navigationHelper.fromBasket,
        style: state.style,
        clientId: state.user.clientId,
        additionalOptions: state.main.additionalOptions,
        products: state.main.products,
    }
}

const mapDispatchToProps = {
    setSelectedProduct,
    updateRating,
    toggleProductInBasket
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoScreen)