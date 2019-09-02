import { CLEAR_PRODUCT_REVIEWS, FETCH_PRODUCT_REVIEWS_SUCCESS, FETCH_PRODUCT_REVIEWS_REQUEST, FETCH_PRODUCT_REVIEWS_FAILURE } from './actions'

const defaultState = {
    isFetching: false,
    reviews: []
}

export const productReviewReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_PRODUCT_REVIEWS_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case FETCH_PRODUCT_REVIEWS_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isFetching: false
            }
        case FETCH_PRODUCT_REVIEWS_FAILURE:
            return {
                ...state,
                isFetching: false
            }
        case CLEAR_PRODUCT_REVIEWS:
            return {
                ...state,
                reviews: []
            }

    }

    return state
}