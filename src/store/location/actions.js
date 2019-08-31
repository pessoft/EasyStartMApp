import { getLocationFetch } from '../../API/fetchAPI'

export const FETCH_LOCATION_SUCCESS = 'FETCH_LOCATION_SUCCESS'
export const FETCH_LOCATION_REQUEST = 'FETCH_LOCATION_REQUEST'
export const FETCH_LOCATION_FAILURE = 'FETCH_LOCATION_FAILURE'

export const getLocation = () => async (dispatch) => {
    dispatch(requestPosts())

    try {
        const location = await getLocationFetch()
        dispatch(successPosts(location))
    } catch {
        dispatch(failurePosts())
    }
}

const requestPosts = () => {
    return {
        type: FETCH_LOCATION_REQUEST
    }
}

const successPosts = location => {
    return {
        type: FETCH_LOCATION_SUCCESS,
        payload: location
    }
}

const failurePosts = () => {
    return {
        type: FETCH_LOCATION_FAILURE,
        payload: true
    }
}