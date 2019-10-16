import React from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    Dimensions,
    Animated,
} from 'react-native'
import Image from 'react-native-scalable-image'
import { SimpleTextButton } from '../../../components/buttons/SimpleTextButton/SimpleTextButton'
import { AirbnbRating } from 'react-native-ratings';
import { PRODUCT_REVIEW, PRODUCT_REVIEW_FROM_BASKET } from '../../../navigation/pointsNavigate'
import Style from './style'
import CommentLinesIcon from '../../../images/font-awesome-svg/comment-lines.svg'
import { timingAnimation } from '../../../animation/timingAnimation'
import { setSelectedProduct } from '../../../store/catalog/actions'
import { getSVGColor } from '../../../helpers/color-helper'
import { updateRating } from '../../../store/main/actions'

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
            fromBasket: props.fromBasket
        }
    }

    componentDidMount() {
        timingAnimation(this.state.showScaleAnimation, 1, 300, true)
    }

    componentDidUpdate() {
        const category = this.props.main.products[this.state.selectedProduct.CategoryId]
        const product = category.filter(p => p.Id == this.state.selectedProduct.Id)[0]

        if (product.Rating != this.state.selectedProduct.Rating) {
            this.setState({ selectedProduct: product })
        }
    }

    getRatingText() {
        const ratingValue = parseFloat(this.state.selectedProduct.Rating.toFixed(1))
        return `Оценка: ${ratingValue} (голосов: ${this.state.selectedProduct.VotesCount})`
    }

    getPriceProduct() {
        return `${this.state.selectedProduct.Price} ${this.props.currencyPrefix}`
    }

    getImageSource() {
        return { uri: `${this.props.serverDomain}${this.state.selectedProduct.Image}` }
    }

    onPressReviews = () => {
        if (this.state.selectedProduct != this.props.selectedProduct) {
            this.props.setSelectedProduct(this.state.selectedProduct)
        }

        const nextScreen = this.state.fromBasket ? PRODUCT_REVIEW_FROM_BASKET : PRODUCT_REVIEW
        this.props.navigation.navigate(nextScreen)
    }

    onFinishRating = score => {
        this.props.updateRating({
            clientId: this.props.clientId,
            productId: this.props.selectedProduct.Id,
            score: score
        })
    }

    render() {
        return (
            <Animated.ScrollView style={[
                { opacity: this.state.showScaleAnimation },
                { transform: [{ scale: this.state.showScaleAnimation }] }]}>
                <Image
                    source={this.getImageSource()}
                    width={Dimensions.get('window').width}
                    resizeMode='contain' />
                <View style={Style.contentBody}>
                    <View style={[
                        Style.productInfoContainer,
                        this.props.style.theme.dividerColor]}>
                        <View style={Style.leftBlock}>
                            <AirbnbRating
                                ratingBackgroundColor={this.props.style.theme.themeBody.backgroundColor}
                                size={28}
                                fractions={1}
                                showRating={false}
                                defaultRating={this.state.selectedProduct.Rating}
                                onFinishRating={this.onFinishRating}
                            />
                            <Text style={[
                                this.props.style.fontSize.h9,
                                this.props.style.theme.secondaryTextColor]}>{this.getRatingText()}
                            </Text>
                            <View style={Style.reviewsButtonWithIcon}>
                                <SimpleTextButton
                                    text={'Отзывы'}
                                    onPress={this.onPressReviews}
                                    sizeText={this.props.style.fontSize.h6.fontSize}
                                    color={this.props.style.theme.accentOther.backgroundColor}
                                />
                                <CommentLinesIcon
                                    width={20}
                                    height={20}
                                    style={{ marginLeft: 5 }}
                                    color={getSVGColor(this.props.style.theme.accentOther.backgroundColor)}
                                />
                            </View>
                        </View>
                        <View style={Style.rightBlock}>
                            <Text style={[
                                this.props.style.fontSize.h4,
                                this.props.style.theme.primaryTextColor]}>
                                {this.getPriceProduct()}
                            </Text>
                            <Text style={[
                                this.props.style.fontSize.h8,
                                this.props.style.theme.secondaryTextColor]}>
                                {this.state.selectedProduct.AdditionInfo}
                            </Text>
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
        serverDomain: state.appSetting.serverDomain,
        currencyPrefix: state.appSetting.currencyPrefix,
        selectedProduct: state.catalog.selectedProduct,
        main: state.main,
        fromBasket: state.navigationHelper.fromBasket,
        style: state.style,
        clientId: state.user.clientId
    }
}

const mapDispatchToProps = {
    setSelectedProduct,
    updateRating
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoScreen)