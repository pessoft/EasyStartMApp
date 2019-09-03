import {
    getProductReviewsFetch,
    setProductReviewsFetch
} from '../../api/requests'

export const FETCH_PRODUCT_REVIEWS_SUCCESS = 'FETCH_PRODUCT_REVIEWS_SUCCESS'
export const FETCH_PRODUCT_REVIEWS_REQUEST = 'FETCH_PRODUCT_REVIEWS_REQUEST'
export const FETCH_PRODUCT_REVIEWS_FAILURE = 'FETCH_PRODUCT_REVIEWS_FAILURE'

export const CLEAR_PRODUCT_REVIEWS = 'CLEAR_PRODUCT_REVIEWS'
export const ADD_PRODUCT_REVIEWS = 'ADD_PRODUCT_REVIEWS'

export const clearReviews = () => {
    return {
        type: CLEAR_PRODUCT_REVIEWS
    }
}

export const addReview = (review) => {
    return {
        type: ADD_PRODUCT_REVIEWS,
        payload: review
    }
}

export const getProductReviews = productId => async (dispatch) => {
    dispatch(requestPosts())

    try {
        const reviews = await getProductReviewsFetch(productId)
        dispatch(successPosts(reviews))
    } catch {
        dispatch(failurePosts())
    }
}

export const setProductReviews = review => async (dispatch) => {
    try {
        setProductReviewsFetch(review)
        dispatch(addReview(review))
    } catch { }
}

const requestPosts = () => {
    return {
        type: FETCH_PRODUCT_REVIEWS_REQUEST
    }
}

const successPosts = reviews => {
    return {
        type: FETCH_PRODUCT_REVIEWS_SUCCESS,
        payload: reviews
    }
}

const failurePosts = () => {
    return {
        type: FETCH_PRODUCT_REVIEWS_FAILURE,
    }
}