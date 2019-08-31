import React from 'react'
import { connect } from 'react-redux'
import {
    KeyboardAvoidingView,
    ScrollView,
    FlatList,
    View,
    Text,
    TextInput,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native'
import { SendButton } from '../../../components/buttons/Square/SendButton'
import { ReviewItem } from '../../../components/review-item/ReviewItem'
import Styles from './style'
import { getProductReviews } from '../../../store/product-reviews/actions'
import CommentSmile from '../../../images/font-awesome-svg/comment-smile.svg'

class ProductReviewScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'Отзывы',
        headerTitleStyle: {
            textAlign: "center",
            flex: 1
        }
    }

    constructor(props) {
        super(props)

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
                <ActivityIndicator size="large" />
            </View>
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
                <KeyboardAvoidingView
                    behavior={'height'}
                    style={Styles.keywordAvoidReviewInput}>
                    <View style={Styles.inputReview}>
                        <TextInput
                            multiline={true}
                            placeholder={'Оставте ваш отзыв'}
                            style={[Styles.h4, Styles.inputText]}
                            onChangeText={this.onNewReviewText}
                        />
                        <SendButton
                            size={36}
                            nonBorder={true}
                            color={this.state.newReviewText.length > 0 ? '#357ae8' : '#bbbcbc'}
                        />
                    </View>
                </KeyboardAvoidingView>
            </React.Fragment>
        )
    }

    renderEmptyReviews = () => {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} >
                <View style={Styles.containerEmptyReviews}>
                    <View style={Styles.centerScreen}>
                        <CommentSmile
                            width={120}
                            height={120}
                            color={'#bbbcbc'}
                        />
                        <Text style={[Styles.h4, { color: '#bbbcbc' }]}>Будь первым!</Text>
                        <Text style={[Styles.h4, { color: '#bbbcbc' }]}>Оставь свой отзыв!</Text>
                    </View>
                    <KeyboardAvoidingView
                        behavior={'height'}
                        returnKeyType={'done'}
                        style={Styles.keywordAvoidReviewInput}>
                        <View style={Styles.inputReview}>
                            <TextInput
                                multiline={true}
                                placeholder={'Оставте ваш отзыв'}
                                style={[Styles.h4, Styles.inputText]}
                                onChangeText={this.onNewReviewText}
                            />
                            <SendButton
                                size={36}
                                nonBorder={true}
                                color={this.state.newReviewText.trim().length > 0 ? '#357ae8' : '#bbbcbc'}
                            />
                        </View>
                    </KeyboardAvoidingView>
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
    }
}

export default connect(mapStateToProps, { getProductReviews })(ProductReviewScreen)