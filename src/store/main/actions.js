import { getMainDataFetch, updateProductRatingFetch } from '../../api/requests'

export const FETCH_MAIN_DATA_SUCCESS = 'FETCH_MAIN_DATA_SUCCESS'
export const FETCH_MAIN_DATA_REQUEST = 'FETCH_MAIN_DATA_REQUEST'
export const FETCH_MAIN_DATA_FAILURE = 'FETCH_MAIN_DATA_FAILURE'

export const FETCH_UPDATE_PRODUCT_RATING_SUCCESS = 'FETCH_UPDATE_PRODUCT_RATING_SUCCESS'
export const FETCH_UPDATE_PRODUCT_RATING_REQUEST = 'FETCH_UPDATE_PRODUCT_RATING_REQUEST'
export const FETCH_UPDATE_PRODUCT_RATING_FAILURE = 'FETCH_UPDATE_PRODUCT_RATING_FAILURE'

export const getMainData = branchId => async (dispatch) => {
    dispatch(requestMainDataPosts())

    try {
        const mainData = await getMainDataFetch(branchId)
        dispatch(successMainDataPosts(mainData))
    } catch {
        dispatch(failureMainDataPosts())
    }
}

export const updateRating = rating => async (dispatch) => {
    dispatch(requestUpdateRatingPosts())

    try {
        const newRating = await updateProductRatingFetch(rating)
        dispatch(successUpdateRatingPosts(newRating))
    } catch {
        dispatch(failureUpdateRatingPosts())
    }
}

const requestUpdateRatingPosts = () => {
    return {
        type: FETCH_UPDATE_PRODUCT_RATING_REQUEST
    }
}

const successUpdateRatingPosts = rating => {
    return {
        type: FETCH_UPDATE_PRODUCT_RATING_SUCCESS,
        payload: rating
    }
}

const failureUpdateRatingPosts = () => {
    return {
        type: FETCH_UPDATE_PRODUCT_RATING_SUCCESS,
        payload: true
    }
}

const requestMainDataPosts = () => {
    return {
        type: FETCH_MAIN_DATA_REQUEST
    }
}

const successMainDataPosts = mainData => {
    return {
        type: FETCH_MAIN_DATA_SUCCESS,
        payload: mainData
    }
}

const failureMainDataPosts = () => {
    return {
        type: FETCH_MAIN_DATA_FAILURE,
        payload: true
    }
}