import {
  SET_IS_LOGIN,
  SET_USER_NAME,
  SET_USER_PHONE_NUMBER,
  SET_USER_PASSWORD,
  SET_USER_EMAIL,
  SET_PARENT_REFERRAL_CODE,
  SET_CITY_ID,
  SET_BRANCH_ID,
  RESET_CLIENT_ID,
  DROP_FETCH_FLAG,
  FETCH_LOGIN_REQUEST,
  FETCH_LOGIN_SUCCESS,
  FETCH_LOGIN_FAILURE,
  FETCH_UPDATE_USER_INFO_REQUEST,
  FETCH_UPDATE_USER_INFO_SUCCESS,
  FETCH_UPDATE_USER_INFO_FAILURE,
  UPDATE_VIRTUAL_MONEY,
  UPDATE_REFERRAL_DISCOUNT,

  FETCH_REGISTRATION_USER_REQUEST,
  FETCH_REGISTRATION_USER_SUCCESS,
  FETCH_REGISTRATION_USER_FAILURE,

  FETCH_RESTORE_PASSWORD_REQUEST,
  FETCH_RESTORE_PASSWORD_SUCCESS,
  FETCH_RESTORE_PASSWORD_FAILURE,

  LOGOUT,
} from './actions'

const defaultState = {
  isFetching: false,
  isFetchError: false,
  isNotifyAboutRestorePassword: false,
  errorMessage: '',
  isLogin: false,
  phoneNumber: '',
  password: '',
  email: '',
  userName: '',
  cityId: -1,
  branchId: -1,
  clientId: -1,
  referralCode: '',
  parentReferralClientId: -1,
  parentReferralCode: '',
  virtualMoney: 0,
  referralDiscount: 0,
}



export const userReducer = (state = defaultState, action) => {

  switch (action.type) {
    case LOGOUT:
      return { ...defaultState }

    case RESET_CLIENT_ID:
      return {
        ...state,
        clientId: action.payload
      }

    case SET_PARENT_REFERRAL_CODE:
      return {
        ...state,
        parentReferralCode: action.payload
      }

    case UPDATE_VIRTUAL_MONEY:
      return {
        ...state,
        virtualMoney: action.payload
      }
    case UPDATE_REFERRAL_DISCOUNT:
      return {
        ...state,
        referralDiscount: action.payload
      }
    case DROP_FETCH_FLAG:
      return {
        ...state,
        isFetching: false,
        isFetchError: false
      }
    case SET_USER_NAME:
      return {
        ...state,
        userName: action.payload
      }
    case SET_USER_PASSWORD:
      return {
        ...state,
        password: action.payload
      }
    case SET_USER_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.payload
      }
    case SET_USER_EMAIL:
      return {
        ...state,
        email: action.payload
      }
    case SET_CITY_ID:
      return {
        ...state,
        cityId: action.payload
      }
    case SET_BRANCH_ID:
      return {
        ...state,
        branchId: action.payload
      }
    case SET_IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload,
      }
    case FETCH_LOGIN_REQUEST:
    case FETCH_UPDATE_USER_INFO_REQUEST:
    case FETCH_REGISTRATION_USER_REQUEST:
    case FETCH_RESTORE_PASSWORD_REQUEST:
      return {
        ...state,
        clientId: -1,
        isFetching: true,
        isFetchError: false,
        errorMessage: '',
        isNotifyAboutRestorePassword: false
      }
    case FETCH_LOGIN_SUCCESS:
    case FETCH_UPDATE_USER_INFO_SUCCESS:
    case FETCH_REGISTRATION_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isFetching: false,
      }
    case FETCH_RESTORE_PASSWORD_SUCCESS:
      return {
        ...state,
        isNotifyAboutRestorePassword: true,
        isFetching: false,
      }
    case FETCH_LOGIN_FAILURE:
    case FETCH_REGISTRATION_USER_FAILURE:
    case FETCH_RESTORE_PASSWORD_FAILURE:
      return {
        ...state,
        isLogin: false,
        isFetchError: true,
        isFetching: false,
        errorMessage: action.payload
      }
    case FETCH_UPDATE_USER_INFO_FAILURE:
      return {
        ...state,
        isFetchError: true,
        isFetching: false,
        errorMessage: action.payload
      }
  }

  return state
}