import {
  checkActualUserDataFetch,
  addOrUpdateUserFetch
} from '../../api/requests'

export const SET_USER_PHONE_NUMBER = 'SET_USER_PHONE_NUMBER'
export const SET_USER_NAME = 'SET_USER_NAME'
export const SET_CITY_ID = 'SET_CITY_ID'
export const RESET_CLIENT_ID = 'RESET_CLIENT_ID'
export const SET_PARENT_REFERRAL_CODE = 'SET_PARENT_REFERRAL_CODE'
export const SET_BRANCH_ID = 'SET_BRANCH_ID'
export const SET_IS_LOGIN = 'SET_IS_LOGIN'
export const DROP_FETCH_FLAG = 'DROP_FETCH_FLAG'
export const UPDATE_VIRTUAL_MONEY = 'UPDATE_VIRTUAL_MONEY'

export const FETCH_CHECK_ACTUAL_USER_INFO_REQUEST = 'FETCH_CHECK_ACTUAL_USER_INFO_REQUEST'
export const FETCH_CHECK_ACTUAL_USER_INFO_SUCCESS = 'FETCH_CHECK_ACTUAL_USER_INFO_SUCCESS'
export const FETCH_CHECK_ACTUAL_USER_INFO_FAILURE = 'FETCH_CHECK_ACTUAL_USER_INFO_FAILURE'

export const FETCH_ADD_OR_UPDATE_USER_INFO_REQUEST = 'FETCH_ADD_OR_UPDATE_USER_INFO_REQUEST'
export const FETCH_ADD_OR_UPDATE_USER_INFO_SUCCESS = 'FETCH_ADD_OR_UPDATE_USER_INFO_SUCCESS'
export const FETCH_ADD_OR_UPDATE_USER_INFO_FAILURE = 'FETCH_ADD_OR_UPDATE_USER_INFO_FAILURE'

export const dropFetchFlag = () => {
  return {
    type: DROP_FETCH_FLAG,
  }
}

export const resetClientId = () => {
  return {
    type: RESET_CLIENT_ID,
    payload: -1
  }
}

export const setIsLogin = isLogin => {
  return {
    type: SET_IS_LOGIN,
    payload: isLogin
  }
}

export const setPhoneNumber = phoneNumber => {
  return {
    type: SET_USER_PHONE_NUMBER,
    payload: phoneNumber
  }
}

export const setUserName = userName => {
  return {
    type: SET_USER_NAME,
    payload: userName
  }
}

export const setCityId = cityId => {
  return {
    type: SET_CITY_ID,
    payload: cityId
  }
}

export const setParentReferralCode = parentReferralCode => {
  return {
    type: SET_PARENT_REFERRAL_CODE,
    payload: parentReferralCode
  }
}

export const setBranchId = branchId => {
  return {
    type: SET_BRANCH_ID,
    payload: branchId
  }
}

export const updateVirtualMoney = value => {
  return {
    type: UPDATE_VIRTUAL_MONEY,
    payload: value
  }
}

export const checkActualUserData = userData => async dispatch => {
  dispatch(requestPostsCheckData())
  try {
    const resultChecking = await checkActualUserDataFetch(userData)
    dispatch(successPostsCheckData(resultChecking))
  } catch (err) {
    dispatch(failurePostsCheckData(err))
  }
}

export const addOrUpdateUser = userData => async dispatch => {
  dispatch(requestPostsAddOrUpdateUser())
  try {
    const newUserData = await addOrUpdateUserFetch(userData)
    dispatch(successPostsAddOrUpdateUser(newUserData))
  } catch (err) {
    dispatch(failurePostsAddOrUpdateUser(err))
  }
}

const requestPostsCheckData = () => {
  return {
    type: FETCH_CHECK_ACTUAL_USER_INFO_REQUEST
  }
}

const successPostsCheckData = result => {
  return {
    type: FETCH_CHECK_ACTUAL_USER_INFO_SUCCESS,
    payload: result
  }
}

const failurePostsCheckData = () => {
  return {
    type: FETCH_CHECK_ACTUAL_USER_INFO_FAILURE,
  }
}

const requestPostsAddOrUpdateUser = () => {
  return {
    type: FETCH_ADD_OR_UPDATE_USER_INFO_REQUEST
  }
}

const successPostsAddOrUpdateUser = result => {
  return {
    type: FETCH_ADD_OR_UPDATE_USER_INFO_SUCCESS,
    payload: result
  }
}

const failurePostsAddOrUpdateUser = () => {
  return {
    type: FETCH_ADD_OR_UPDATE_USER_INFO_FAILURE,
  }
}

