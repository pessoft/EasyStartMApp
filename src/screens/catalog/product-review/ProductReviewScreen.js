import React from 'react'
import { connect } from 'react-redux'
import {
    ScrollView,
    FlatList,
    View,
    Text,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import { ReviewItem } from '../../../components/review-item/ReviewItem'
import Styles from './style'
import { getProductReviews, clearReviews } from '../../../store/product-reviews/actions'
import CommentSmile from '../../../images/font-awesome-svg/comment-smile.svg'
import { MessageInput } from '../../../components/message-input/MessageInput'

class ProductReviewScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Отзывы',
    }

    constructor(props) {
        super(props)

        this.props.clearReviews()
        this.state = {
            newReviewText: ''
        }
    }

    getTestReviews = () => {
        const reviews = []

        for (let i = 0; i < 20; ++i) {
            reviews.push({
                key: i.toString(),
                header: 'Клиентв +7(964)645-23-45',
                text: `${i}: Тут какой то текст отзыва, которые должне быть в нсколько строн`
            })
        }
        return reviews
    }

    renderItem = ({ item }) => {
        return <ReviewItem {...item} />
    }

    onNewReviewText = text => {
        this.setState({ newReviewText: text })
    }

    componentDidMount = () => {
        this.props.getProductReviews(this.props.selectedProduct.Id)
    }

    toStringDateAndTime = date => {
        let day = date.getDate().toString()
        day = day.length == 1 ? "0" + day : day
        let month = (date.getMonth() + 1).toString()
        month = month.length == 1 ? "0" + month : month
        let hours = date.getHours().toString()
        hours = hours.length == 1 ? "0" + hours : hours
        let minutes = date.getMinutes().toString()
        minutes = minutes.length == 1 ? "0" + minutes : minutes
        let dateStr = `${hours}:${minutes} ${day}.${month}.${date.getFullYear()}`
        return dateStr;
    }

    jsonToDate = value => {
        let date;
        if (value.includes("/Date")) {
            date = new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
        } else {
            date = new Date(value);
        }

        return date;
    }

    getReviews = () => {
        const reviews = []

        for (review of this.props.reviews) {
            reviews.push({
                key: review.Id.toString(),
                style: this.props.style,
                header: `Клиент ${review.PhoneNumber}`,
                text: `${review.ReviewText}`,
                date: this.toStringDateAndTime(this.jsonToDate(review.Date))
            })
        }

        return reviews;
    }

    renderLoader = () => {
        return (
            <View style={Styles.centerScreen}>
                <ActivityIndicator size="large" color={this.props.style.theme.defaultPrimaryColor.backgroundColor} />
            </View>
        )
    }

    renderInputFooter = () => {
        return (
            <MessageInput
                style={this.props.style}
                placeholder={'Оставте свой отзыв...'}
                buttonSize={24}
                textSize={this.props.style.fontSize.h8}
                onPress={this.onNewReviewText}
            />
        )
    }

    renderReviews = () => {
        return (
            <React.Fragment>
                <ScrollView style={Styles.reviews}>
                    <FlatList
                        data={this.getReviews()}
                        renderItem={this.renderItem}
                    />
                </ScrollView>
                {this.renderInputFooter()}
            </React.Fragment>
        )
    }

    renderEmptyReviews = () => {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
                <View style={Styles.containerEmptyReviews}>
                    <View style={Styles.centerScreen}>
                        <CommentSmile
                            width={100}
                            height={100}
                            color={this.props.style.theme.secondaryTextColor.color}
                        />
                        <Text style={[this.props.style.fontSize.h7, this.props.style.theme.secondaryTextColor]}>Будь первым!</Text>
                        <Text style={[this.props.style.fontSize.h7, this.props.style.theme.secondaryTextColor]}>Оставь свой отзыв!</Text>
                    </View>
                    {this.renderInputFooter()}
                </View>
            </TouchableWithoutFeedback>
        )
    }

    render() {
        if (this.props.isFetching)
            return this.renderLoader()

        if (this.props.reviews.length > 0)
            return this.renderReviews()
        else
            return this.renderEmptyReviews()
    }
}

const mapStateToProps = state => {
    return {
        selectedProduct: state.catalog.selectedProduct,
        reviews: state.productReviews.reviews,
        isFetching: state.productReviews.isFetching,
        style: state.style
    }
}

export default connect(mapStateToProps, { getProductReviews, clearReviews })(ProductReviewScreen)