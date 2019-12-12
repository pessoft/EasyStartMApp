import { getMainDataFetch, updateProductRatingFetch } from '../../api/requests'
import { SERVER_DOMAIN } from '../../api/server-domain'

export const FETCH_MAIN_DATA_SUCCESS = 'FETCH_MAIN_DATA_SUCCESS'
export const FETCH_MAIN_DATA_REQUEST = 'FETCH_MAIN_DATA_REQUEST'
export const FETCH_MAIN_DATA_FAILURE = 'FETCH_MAIN_DATA_FAILURE'

export const FETCH_UPDATE_PRODUCT_RATING_SUCCESS = 'FETCH_UPDATE_PRODUCT_RATING_SUCCESS'
export const FETCH_UPDATE_PRODUCT_RATING_REQUEST = 'FETCH_UPDATE_PRODUCT_RATING_REQUEST'
export const FETCH_UPDATE_PRODUCT_RATING_FAILURE = 'FETCH_UPDATE_PRODUCT_RATING_FAILURE'

export const FETCH_COUPON_SUCCESS = 'FETCH_COUPON_SUCCESS'
export const FETCH_COUPON_REQUEST = 'FETCH_COUPON_REQUEST'
export const FETCH_COUPON_FAILURE = 'FETCH_COUPON_FAILURE'

export const getMainData = params => async (dispatch) => {
    dispatch(requestMainDataPosts())

    try {
        const mainData = await getMainDataFetch(params)
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
        type: FETCH_UPDATE_PRODUCT_RATING_FAILURE,
        payload: true
    }
}

const requestMainDataPosts = () => {
    return {
        type: FETCH_MAIN_DATA_REQUEST
    }
}

const successMainDataPosts = mainData => {
    processingMainData(mainData)

    return {
        type: FETCH_MAIN_DATA_SUCCESS,
        payload: mainData
    }
}

const processingMainData = mainData => {

    if (mainData && mainData.stocks && mainData.stocks.length > 0) {
        for (const stock of mainData.stocks) {
            stock.ConditionCountProducts = JSON.parse(stock.ConditionCountProductsJSON)
            stock.Image = getImageSource(stock.Image)
        }
    }

    if (mainData && mainData.categories && mainData.categories.length > 0) {
        for (const category of mainData.categories) {
            category.Image = getImageSource(category.Image)
        }
    }

    if (mainData && mainData.products && Object.keys(mainData.products).length > 0) {
        for (const categoryId in mainData.products) {
            for (const product of mainData.products[categoryId]) {
                product.Image = getImageSource(product.Image)
            }
        }
    }
}


const getImageSource = imagePath => {
    return { uri: `${SERVER_DOMAIN}${imagePath}` }
}

const failureMainDataPosts = () => {
    return {
        type: FETCH_MAIN_DATA_FAILURE,
        payload: true
    }
}

const requestCouponPosts = () => {
    return {
        type: FETCH_COUPON_REQUEST
    }
}

const successCouponPosts = coupon => {
    return {
        type: FETCH_COUPON_SUCCESS,
        payload: coupon
    }
}

const failureCouponPosts = () => {
    return {
        type: FETCH_COUPON_FAILURE,
        payload: true
    }
}