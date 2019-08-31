import { getMainDataFetch } from '../../API/fetchAPI'

export const FETCH_MAIN_DATA_SUCCESS = 'FETCH_MAIN_DATA_SUCCESS'
export const FETCH_MAIN_DATA_REQUEST = 'FETCH_MAIN_DATA_REQUEST'
export const FETCH_MAIN_DATA_FAILURE = 'FETCH_MAIN_DATA_FAILURE'

export const getMainData = branchId => async (dispatch) => {
    dispatch(requestPosts())

    try {
        const mainData = await getMainDataFetch(branchId)
        dispatch(successPosts(mainData))
    } catch {
        dispatch(failurePosts())
    }
}

const requestPosts = () => {
    return {
        type: FETCH_MAIN_DATA_REQUEST
    }
}

const successPosts = mainData => {
    return {
        type: FETCH_MAIN_DATA_SUCCESS,
        payload: mainData
    }
}

const failurePosts = () => {
    return {
        type: FETCH_MAIN_DATA_FAILURE,
        payload: true
    }
}