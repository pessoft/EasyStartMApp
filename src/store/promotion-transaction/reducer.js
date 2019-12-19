import {
    FETCH_PARTNERS_TRANSACTION_SUCCESS,
    FETCH_PARTNERS_TRANSACTION_REQUEST,
    FETCH_PARTNERS_TRANSACTION_FAILURE,

    FETCH_CASHBACK_TRANSACTION_SUCCESS,
    FETCH_CASHBACK_TRANSACTION_REQUEST,
    FETCH_CASHBACK_TRANSACTION_FAILURE
} from './actions'

const defaultState = {
    isFetching: false,
    isFetchError: false,
    partnerTransactions: [],
    cashbackTransactions: []
}

export const promotionTransactionReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_PARTNERS_TRANSACTION_SUCCESS:
            return {
                ...state,
                isFetching: false,
                partnerTransactions: action.payload
            }
        case FETCH_CASHBACK_TRANSACTION_SUCCESS:
            return {
                ...state,
                isFetching: false,
                cashbackTransactions: action.payload
            }
        case FETCH_PARTNERS_TRANSACTION_REQUEST:
        case FETCH_CASHBACK_TRANSACTION_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFetchError: false,
            }
        case FETCH_PARTNERS_TRANSACTION_FAILURE:
        case FETCH_CASHBACK_TRANSACTION_FAILURE:
            return {
                ...state,
                isFetching: false,
                isFetchError: true,
                partnerTransactions: [],
                cashbackTransactions: []
            }
    }

    return state
}