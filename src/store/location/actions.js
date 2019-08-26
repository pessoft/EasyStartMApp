import { getLocationFetch } from '../../API/requiredAPI'

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST'
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'

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
        type: FETCH_POSTS_REQUEST
    }
}

const successPosts = location => {
    return {
        type: FETCH_POSTS_SUCCESS,
        payload: location
    }
}

const failurePosts = () => {
    return {
        type: FETCH_POSTS_FAILURE,
        payload: true
    }
}