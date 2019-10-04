import React from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    Dimensions,
    Animated
} from 'react-native'
import Image from 'react-native-scalable-image'
import { SimpleTextButton } from '../../../components/buttons/SimpleTextButton/SimpleTextButton'
import { Rating } from 'react-native-ratings';
import { PRODUCT_REVIEW, PRODUCT_REVIEW_FROM_BASKET } from '../../../navigation/pointsNavigate'
import Style from './style'
import CommentLinesIco from '../../../images/font-awesome-svg/comment-lines.svg'
import { timingAnimation } from '../../../animation/timingAnimation'
import { setSelectedProduct } from '../../../store/catalog/actions'

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
                            <Rating
                                type={'heart'}
                                tintColor={this.props.style.theme.themeBody.backgroundColor}
                                imageSize={26}
                                fractions={1}
                                startingValue={this.state.selectedProduct.Rating}
                            />
                            <Text style={[
                                this.props.style.fontSize.h9,
                                this.props.style.theme.secondaryTextColor]}>{this.getRatingText()}
                            </Text>
                            <View style={Style.reviewsButtonWithIco}>
                                <SimpleTextButton
                                    text={'Отзывы'}
                                    onPress={this.onPressReviews}
                                    sizeText={this.props.style.fontSize.h6.fontSize}
                                    color={this.props.style.theme.accentColor.backgroundColor}
                                />
                                <CommentLinesIco
                                    width={20}
                                    height={20}
                                    style={{ marginLeft: 5 }}
                                    color={getSVGColor(this.props.style.theme.accentColor.backgroundColor)}
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
        fromBasket: state.navigationHelper.fromBasket,
        style: state.style
    }
}

export default connect(mapStateToProps, { setSelectedProduct })(ProductInfoScreen)