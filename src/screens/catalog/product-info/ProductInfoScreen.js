import React from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    Dimensions,
    Animated,
    processColor
} from 'react-native'
import Image from 'react-native-scalable-image'
import { SimpleTextButton } from '../../../components/buttons/SimpleTextButton/SimpleTextButton'
import { Rating } from 'react-native-ratings';
import { PRODUCT_REVIEW } from '../../../navigation/pointsNavigate'
import Styles from './style'
import CommentLinesIco from '../../../images/font-awesome-svg/comment-lines.svg'
import { timingAnimation } from '../../../animation/timingAnimation'

class ProductInfoScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.getParam('productName', 'Блюдо'),
        }
    }

    constructor(props) {
        super(props)
        this.props.navigation.setParams({ productName: this.Product.Name })

        this.state = {
            showScaleAnimation: new Animated.Value(0)
        }
    }

    getColor = color => {
        if(Platform.OS === 'ios') {
            return processColor(color)
        }

        return color
    }

    componentDidMount() {
        timingAnimation(this.state.showScaleAnimation, 1, 300, true)
    }

    get Product() {
        return this.props.selectedProduct
    }

    getRatingText() {
        const ratingValue = parseFloat(this.Product.Rating.toFixed(1))
        return `Оценка: ${ratingValue} (голосов: ${this.Product.VotesCount})`
    }

    getPriceProduct() {
        return `${this.Product.Price} ${this.props.currencyPrefix}`
    }

    getImageSource() {
        return { uri: `${this.props.serverDomain}${this.Product.Image}` }
    }

    onPressReviews = () => {
        this.props.navigation.navigate(PRODUCT_REVIEW)
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
                <View style={Styles.contentBody}>
                    <View style={[
                        Styles.productInfoContainer,
                        this.props.style.theme.dividerColor]}>
                        <View style={Styles.leftBlock}>
                            <Rating
                                type={'heart'}
                                tintColor={this.props.style.theme.themeBody.backgroundColor}
                                imageSize={26}
                                fractions={1}
                                startingValue={this.Product.Rating}
                            />
                            <Text style={[
                                this.props.style.fontSize.h9,
                                this.props.style.theme.secondaryTextColor]}>{this.getRatingText()}
                            </Text>
                            <View style={Styles.reviewsButtonWithIco}>
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
                                    color={this.getColor(this.props.style.theme.accentColor.backgroundColor)}
                                />
                            </View>
                        </View>
                        <View style={Styles.rightBlock}>
                            <Text style={[
                                this.props.style.fontSize.h4,
                                this.props.style.theme.primaryTextColor]}>
                                {this.getPriceProduct()}
                            </Text>
                            <Text style={[
                                this.props.style.fontSize.h8,
                                this.props.style.theme.secondaryTextColor]}>
                                {this.Product.AdditionInfo}
                            </Text>
                        </View>
                    </View>
                    <Text style={[
                        Styles.description,
                        this.props.style.fontSize.h8,
                        this.props.style.theme.secondaryTextColor]}>
                        {this.Product.Description}
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
        style: state.style
    }
}

export default connect(mapStateToProps)(ProductInfoScreen)