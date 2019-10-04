import React from 'react'
import { connect } from 'react-redux'
import {
    FlatList,
    View,
    Text,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard,
    Animated
} from 'react-native'
import { ReviewItem } from '../../../components/review-item/ReviewItem'
import Style from './style'
import { getProductReviews, clearReviews, setProductReviews } from '../../../store/product-reviews/actions'
import CommentSmile from '../../../images/font-awesome-svg/comment-smile.svg'
import { MessageInput } from '../../../components/message-input/MessageInput'
import { timingAnimation } from '../../../animation/timingAnimation'
import { getSVGColor } from '../../../helpers/color-helper'

class ProductReviewScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Отзывы',
    }

    constructor(props) {
        super(props)

        this.props.clearReviews()

        this.state = {
            showScaleAnimation: new Animated.Value(0),
            showScaleAnimationEmpty: new Animated.Value(0),
        }
    }

    renderItem = ({ item }) => {
        return <ReviewItem {...item} />
    }

    onSetNewReview = text => {
        const newReview = {
            Id: new Date().getTime(),
            ClientId: this.props.user.clientId,
            CityId: this.props.user.cityId,
            ProductId: this.props.selectedProduct.Id,
            PhoneNumber: this.props.user.phoneNumber,
            Reviewer: `${this.props.user.userName}`,
            ReviewText: text,
            Date: new Date().toString(),
            animation: {
                useAnimation: true,
                duration: 300
            }
        }

        this.props.setProductReviews(newReview)
    }

    componentDidMount = () => {
        this.props.getProductReviews(this.props.selectedProduct.Id)
    }

    componentDidUpdate() {
        if (this.props.reviews.length == 0 && !this.props.isFetching) {
            timingAnimation(this.state.showScaleAnimationEmpty, 1, 300, true)
        }
        else if (this.props.reviews.length > 0) {
            timingAnimation(this.state.showScaleAnimation, 1, 300, true)
        }
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
                animation: {
                    useAnimation: review.animation || false
                },
                key: review.Id.toString(),
                style: this.props.style,
                header: review.Reviewer,
                text: `${review.ReviewText}`,
                date: this.toStringDateAndTime(this.jsonToDate(review.Date))
            })
        }

        return reviews;
    }

    renderLoader = () => {
        return (
            <View style={Style.centerScreen}>
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
                onPressButton={this.onSetNewReview}
            />
        )
    }

    renderReviews = () => {
        return (
            <React.Fragment>
                <Animated.ScrollView style={[
                    Style.reviews,
                    { opacity: this.state.showScaleAnimation },
                    { transform: [{ scale: this.state.showScaleAnimation }] }
                ]}>
                    <FlatList
                        data={this.getReviews()}
                        renderItem={this.renderItem}
                    />
                </Animated.ScrollView>
                {this.renderInputFooter()}
            </React.Fragment>
        )
    }

    renderEmptyReviews = () => {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
                <View style={Style.containerEmptyReviews}>
                    <Animated.View style={[
                        Style.centerScreen,
                        { opacity: this.state.showScaleAnimationEmpty },
                        { transform: [{ scale: this.state.showScaleAnimationEmpty }] }]} >
                        <CommentSmile
                            width={90}
                            height={90}
                            color={getSVGColor(this.props.style.theme.secondaryTextColor.color)}
                        />
                        <Text style={[this.props.style.fontSize.h7, this.props.style.theme.secondaryTextColor]}>Будь первым!</Text>
                        <Text style={[this.props.style.fontSize.h7, this.props.style.theme.secondaryTextColor]}>Оставь свой отзыв!</Text>
                    </Animated.View>
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
        user: state.user,
        style: state.style
    }
}

const mapActionToProps = {
    getProductReviews,
    clearReviews,
    setProductReviews
}

export default connect(mapStateToProps, mapActionToProps)(ProductReviewScreen)