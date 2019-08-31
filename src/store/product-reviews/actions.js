import { getPrductReviewsFetch } from '../../API/fetchAPI'

export const FETCH_PRODUCT_REVIEWS_SUCCESS = 'FETCH_PRODUCT_REVIEWS_SUCCESS'
export const FETCH_PRODUCT_REVIEWS_REQUEST = 'FETCH_PRODUCT_REVIEWS_REQUEST'
export const FETCH_PRODUCT_REVIEWS_FAILURE = 'FETCH_PRODUCT_REVIEWS_FAILURE'

export const getProductReviews = productId => async (dispatch) => {
    dispatch(requestPosts())

    try {
        const reviews = await getPrductReviewsFetch(productId)
        dispatch(successPosts(reviews))
    } catch {
        dispatch(failurePosts())
    }
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