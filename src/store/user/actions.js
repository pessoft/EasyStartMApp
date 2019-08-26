import { checkActualUserDataFetch } from '../../API/settings'

export const SET_USER_PHONE_NUMBER = 'SET_USER_PHONE_NUMBER'
export const SET_CITY_ID = 'SET_CITY_ID'
export const SET_BRANCH_ID = 'SET_BRANCH_ID'
export const SET_IS_LOGIN = 'SET_IS_LOGIN'

export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE'

export const setPhoneNumber = (phoneNumber) => {
  return {
    type: SET_USER_PHONE_NUMBER,
    payload: phoneNumber
  }
}

export const setCityId = (cityId) => {
  return {
    type: SET_CITY_ID,
    payload: cityId
  }
}

export const setBranchId = (branchId) => {
  return {
    type: SET_BRANCH_ID,
    payload: branchId
  }
}

export const checkActualUserData = (userData) => async dispatch => {
  dispatch(requestPosts())
  try {
    const isActual = await checkActualUserDataFetch(userData)
    dispatch(successPosts(isActual))
  } catch (err) {
    dispatch(failurePosts(err))
  }
}

const requestPosts = () => {
  return {
    type: FETCH_POSTS_REQUEST
  }
}

const successPosts = state => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: state
  }
}

const failurePosts = state => {
  return {
    type: FETCH_POSTS_FAILURE,
    payload: state
  }
}

