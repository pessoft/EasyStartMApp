import { checkActualUserDataFetch } from '../../API/fetchAPI'

export const SET_USER_PHONE_NUMBER = 'SET_USER_PHONE_NUMBER'
export const SET_CITY_ID = 'SET_CITY_ID'
export const SET_BRANCH_ID = 'SET_BRANCH_ID'
export const SET_IS_LOGIN = 'SET_IS_LOGIN'

export const FETCH_CHECK_ACTUAL_USER_INFO_REQUEST = 'FETCH_CHECK_ACTUAL_USER_INFO_REQUEST'
export const FETCH_CHECK_ACTUAL_USER_INFO_SUCCESS = 'FETCH_CHECK_ACTUAL_USER_INFO_SUCCESS'
export const FETCH_CHECK_ACTUAL_USER_INFO_FAILURE = 'FETCH_CHECK_ACTUAL_USER_INFO_FAILURE'

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
    type: FETCH_CHECK_ACTUAL_USER_INFO_REQUEST
  }
}

const successPosts = isActual => {
  return {
    type: FETCH_CHECK_ACTUAL_USER_INFO_SUCCESS,
    payload: isActual
  }
}

const failurePosts = isErrorFetch => {
  return {
    type: FETCH_CHECK_ACTUAL_USER_INFO_FAILURE,
    payload: isErrorFetch
  }
}

