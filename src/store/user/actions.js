import {
  loginFetch,
  updateUserFetch,
  registrationClientFetch,
  restorePasswordClientFetch
} from '../../api/requests'

export const SET_USER_PHONE_NUMBER = 'SET_USER_PHONE_NUMBER'
export const SET_USER_PASSWORD = 'SET_USER_PASSWORD'
export const SET_USER_EMAIL = 'SET_USER_EMAIL'
export const SET_USER_NAME = 'SET_USER_NAME'
export const SET_CITY_ID = 'SET_CITY_ID'
export const RESET_CLIENT_ID = 'RESET_CLIENT_ID'
export const SET_PARENT_REFERRAL_CODE = 'SET_PARENT_REFERRAL_CODE'
export const SET_BRANCH_ID = 'SET_BRANCH_ID'
export const SET_IS_LOGIN = 'SET_IS_LOGIN'
export const DROP_FETCH_FLAG = 'DROP_FETCH_FLAG'
export const UPDATE_VIRTUAL_MONEY = 'UPDATE_VIRTUAL_MONEY'
export const UPDATE_REFERRAL_DISCOUNT = 'UPDATE_REFERRAL_DISCOUNT'

export const FETCH_LOGIN_REQUEST = 'FETCH_LOGIN_REQUEST'
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS'
export const FETCH_LOGIN_FAILURE = 'FETCH_LOGIN_FAILURE'

export const FETCH_UPDATE_USER_INFO_REQUEST = 'FETCH_UPDATE_USER_INFO_REQUEST'
export const FETCH_UPDATE_USER_INFO_SUCCESS = 'FETCH_UPDATE_USER_INFO_SUCCESS'
export const FETCH_UPDATE_USER_INFO_FAILURE = 'FETCH_UPDATE_USER_INFO_FAILURE'

export const FETCH_REGISTRATION_USER_REQUEST = 'FETCH_REGISTRATION_USER_REQUEST'
export const FETCH_REGISTRATION_USER_SUCCESS = 'FETCH_REGISTRATION_USER_SUCCESS'
export const FETCH_REGISTRATION_USER_FAILURE = 'FETCH_REGISTRATION_USER_FAILURE'

export const FETCH_RESTORE_PASSWORD_REQUEST = 'FETCH_RESTORE_PASSWORD_REQUEST'
export const FETCH_RESTORE_PASSWORD_SUCCESS = 'FETCH_RESTORE_PASSWORD_SUCCESS'
export const FETCH_RESTORE_PASSWORD_FAILURE = 'FETCH_RESTORE_PASSWORD_FAILURE'

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

export const setUserPassword = password => {
  return {
    type: SET_USER_PASSWORD,
    payload: password
  }
}

export const setUserEmail = email => {
  return {
    type: SET_USER_EMAIL,
    payload: email
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

export const updateReferralDiscount = value => {
  return {
    type: UPDATE_REFERRAL_DISCOUNT,
    payload: value
  }
}

export const login = userData => async dispatch => {
  dispatch(requestPostsLogin())
  try {
    const resultChecking = await loginFetch(userData)
    dispatch(successPostsLogin(resultChecking))
  } catch (err) {
    dispatch(failurePostsLogin(err.message))
  }
}

export const updateUser = userData => async dispatch => {
  dispatch(requestPostsUpdateUser())
  try {
    const newUserData = await updateUserFetch(userData)
    dispatch(successPostsUpdateUser(newUserData))
  } catch (err) {
    dispatch(failurePostsUpdateUser(err.message))
  }
}

export const registrationUser = userData => async dispatch => {
  dispatch(requestPostsRegistrationUser())
  try {
    const data = await registrationClientFetch(userData)
    dispatch(successPostsRegistrationUser(data))
  } catch (err) {
    dispatch(failurePostsRegistrationUser(err.message))
  }
}

export const restoreUserPassword = email => async dispatch => {
  dispatch(requestPostRestorePassword())
  try {
    await restorePasswordClientFetch(email)
    dispatch(successPostsRestorePassword())
  } catch (err) {
    dispatch(failurePostsRestorePassword(err.message))
  }
}

const requestPostsLogin = () => {
  return {
    type: FETCH_LOGIN_REQUEST
  }
}

const successPostsLogin = result => {
  return {
    type: FETCH_LOGIN_SUCCESS,
    payload: result
  }
}

const failurePostsLogin = errMessage => {
  return {
    type: FETCH_LOGIN_FAILURE,
    payload: errMessage
  }
}

const requestPostsUpdateUser = () => {
  return {
    type: FETCH_UPDATE_USER_INFO_REQUEST
  }
}

const successPostsUpdateUser = result => {
  return {
    type: FETCH_UPDATE_USER_INFO_SUCCESS,
    payload: result
  }
}

const failurePostsUpdateUser = errMessage => {
  return {
    type: FETCH_UPDATE_USER_INFO_FAILURE,
    payload: errMessage
  }
}

const requestPostsRegistrationUser = () => {
  return {
    type: FETCH_REGISTRATION_USER_REQUEST
  }
}

const successPostsRegistrationUser = data => {
  return {
    type: FETCH_REGISTRATION_USER_SUCCESS,
    payload: data
  }
}

const failurePostsRegistrationUser = errMessage => {
  return {
    type: FETCH_REGISTRATION_USER_FAILURE,
    payload: errMessage
  }
}

const requestPostRestorePassword = () => {
  return {
    type: FETCH_RESTORE_PASSWORD_REQUEST
  }
}

const successPostsRestorePassword = () => {
  return {
    type: FETCH_RESTORE_PASSWORD_SUCCESS
  }
}

const failurePostsRestorePassword = errMessage => {
  return {
    type: FETCH_REGISTRATION_USER_FAILURE,
    payload: errMessage
  }
}

