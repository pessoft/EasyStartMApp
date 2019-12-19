import {
    getPartnersTransactionFetch,
    getCashbackTransactionFetch
} from '../../api/requests'

export const FETCH_PARTNERS_TRANSACTION_SUCCESS = 'FETCH_PARTNERS_TRANSACTION_SUCCESS'
export const FETCH_PARTNERS_TRANSACTION_REQUEST = 'FETCH_PARTNERS_TRANSACTION_REQUEST'
export const FETCH_PARTNERS_TRANSACTION_FAILURE = 'FETCH_PARTNERS_TRANSACTION_FAILURE'

export const FETCH_CASHBACK_TRANSACTION_SUCCESS = 'FETCH_CASHBACK_TRANSACTION_SUCCESS'
export const FETCH_CASHBACK_TRANSACTION_REQUEST = 'FETCH_CASHBACK_TRANSACTION_REQUEST'
export const FETCH_CASHBACK_TRANSACTION_FAILURE = 'FETCH_CASHBACK_TRANSACTION_FAILURE'


export const getPartnersTransaction = clientId => async (dispatch) => {
    dispatch(requestPartnersTransactionPosts())

    try {
        const result = await getPartnersTransactionFetch(clientId)
        dispatch(successPartnersTransactionPosts(result))
    } catch {
        dispatch(failurePartnersTransactionPosts())
    }
}

const requestPartnersTransactionPosts = () => {
    return {
        type: FETCH_PARTNERS_TRANSACTION_REQUEST
    }
}

const successPartnersTransactionPosts = reviews => {
    return {
        type: FETCH_PARTNERS_TRANSACTION_SUCCESS,
        payload: reviews
    }
}

const failurePartnersTransactionPosts = () => {
    return {
        type: FETCH_PARTNERS_TRANSACTION_FAILURE,
    }
}

export const getCashbackTransaction = clientId => async (dispatch) => {
    dispatch(requestCashbackTransactionPosts())

    try {
        const result = await getCashbackTransactionFetch(clientId)
        dispatch(successCashbackTransactionPosts(result))
    } catch {
        dispatch(failureCashbackTransactionPosts())
    }
}

const requestCashbackTransactionPosts = () => {
    return {
        type: FETCH_CASHBACK_TRANSACTION_REQUEST
    }
}

const successCashbackTransactionPosts = reviews => {
    return {
        type: FETCH_CASHBACK_TRANSACTION_SUCCESS,
        payload: reviews
    }
}

const failureCashbackTransactionPosts = () => {
    return {
        type: FETCH_CASHBACK_TRANSACTION_FAILURE,
    }
}