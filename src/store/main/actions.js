import { getMainDataFetch, updateProductRatingFetch, getCouponFetch, getStocksFetch } from '../../api/requests'
import { getImageSource } from '../../helpers/utils'

export const FETCH_MAIN_DATA_SUCCESS = 'FETCH_MAIN_DATA_SUCCESS'
export const FETCH_MAIN_DATA_REQUEST = 'FETCH_MAIN_DATA_REQUEST'
export const FETCH_MAIN_DATA_FAILURE = 'FETCH_MAIN_DATA_FAILURE'

export const FETCH_UPDATE_PRODUCT_RATING_SUCCESS = 'FETCH_UPDATE_PRODUCT_RATING_SUCCESS'
export const FETCH_UPDATE_PRODUCT_RATING_REQUEST = 'FETCH_UPDATE_PRODUCT_RATING_REQUEST'
export const FETCH_UPDATE_PRODUCT_RATING_FAILURE = 'FETCH_UPDATE_PRODUCT_RATING_FAILURE'

export const FETCH_COUPON_SUCCESS = 'FETCH_COUPON_SUCCESS'
export const FETCH_COUPON_REQUEST = 'FETCH_COUPON_REQUEST'
export const FETCH_COUPON_FAILURE = 'FETCH_COUPON_FAILURE'
export const CLEAN_COUPON = 'CLEAN_COUPON'
export const RESET_DATA = 'RESET_DATA'

export const FETCH_STOCKS_SUCCESS = 'FETCH_STOCKS_SUCCESS'
export const FETCH_STOCKS_REQUEST = 'FETCH_STOCKS_REQUEST'
export const FETCH_STOCKS_FAILURE = 'FETCH_STOCKS_FAILURE'

export const resetMainData = () => {
    return {
        type: RESET_DATA
    }
}

export const getMainData = params => async (dispatch) => {
    dispatch(requestMainDataPosts())

    try {
        const mainData = await getMainDataFetch(params)
        dispatch(successMainDataPosts(mainData))
    } catch {
        dispatch(failureMainDataPosts())
    }
}

export const getStocks = params => async (dispatch) => {
    dispatch(requestStocksPosts())

    try {
        const stocks = await getStocksFetch(params)
        processingStocks(stocks)

        dispatch(successStocksPosts(stocks))
    } catch {
        dispatch(failureStocksPosts())
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

export const getCoupon = params => async (dispatch) => {
    dispatch(requestCouponPosts())

    try {
        const coupon = await getCouponFetch(params)
        dispatch(successCouponPosts(coupon))
    } catch {
        dispatch(failureCouponPosts())
    }
}

export const cleanCoupon = () => {
    return {
        type: CLEAN_COUPON
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

const processingStocks = data => {
    if (data && data.stocks && data.stocks.length > 0) {
        for (const stock of data.stocks) {
            stock.ConditionCountProducts = JSON.parse(stock.ConditionCountProductsJSON)
            stock.Image = getImageSource(stock.Image)
        }
    }
}

const processingMainData = mainData => {
    processingStocks(mainData)

    if (mainData && mainData.news && mainData.news.length > 0) {
        for (const news of mainData.news) {
            news.Image = getImageSource(news.Image)
        }
    }

    if (mainData && mainData.categories && mainData.categories.length > 0) {
        for (const category of mainData.categories) {
            category.Image = getImageSource(category.Image)
        }
    }

    if (mainData && mainData.products && Object.keys(mainData.products).length > 0) {
        mainData.productDictionary = {}
        for (const categoryId in mainData.products) {
            for (const product of mainData.products[categoryId]) {
                product.Image = getImageSource(product.Image)
                mainData.productDictionary[product.Id] = product
            }
        }
    }

    if (mainData && mainData.constructorCategories && Object.keys(mainData.constructorCategories).length > 0) {
        for (const categoryId in mainData.constructorCategories) {
            for (const constructorCategory of mainData.constructorCategories[categoryId]) {
                constructorCategory.Image = getImageSource(constructorCategory.Image)
            }
        }
    }

    if (mainData && mainData.ingredients && Object.keys(mainData.ingredients).length > 0) {
        for (const subCategoryId in mainData.ingredients) {
            for (const ingredient of mainData.ingredients[subCategoryId]) {
                ingredient.Image = getImageSource(ingredient.Image)
            }
        }
    }
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

const requestStocksPosts = () => {
    return {
        type: FETCH_STOCKS_REQUEST
    }
}

const successStocksPosts = stocks => {
    return {
        type: FETCH_STOCKS_SUCCESS,
        payload: stocks
    }
}

const failureStocksPosts = () => {
    return {
        type: FETCH_STOCKS_FAILURE,
        payload: true
    }
}