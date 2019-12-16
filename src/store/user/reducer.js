import {
  SET_IS_LOGIN,
  SET_USER_NAME,
  SET_USER_PHONE_NUMBER,
  SET_CITY_ID, SET_BRANCH_ID,
  DROP_FETCH_FLAG,
  FETCH_CHECK_ACTUAL_USER_INFO_REQUEST,
  FETCH_CHECK_ACTUAL_USER_INFO_SUCCESS,
  FETCH_CHECK_ACTUAL_USER_INFO_FAILURE,
  FETCH_ADD_OR_UPDATE_USER_INFO_REQUEST,
  FETCH_ADD_OR_UPDATE_USER_INFO_SUCCESS,
  FETCH_ADD_OR_UPDATE_USER_INFO_FAILURE,
  UPDATE_VIRTUAL_MONEY
} from './actions'

const defaultState = {
  isFetching: false,
  isFetchError: false,
  isLogin: false,
  phoneNumber: '',
  userName: '',
  cityId: -1,
  branchId: -1,
  clientId: -1,
  referralCode: '',
  parentReferralClientId: -1,
  virtualMoney: 0,
  referralDiscount: 0,
  placedOrders: false
}

export const userReducer = (state = defaultState, action) => {

  switch (action.type) {
    case UPDATE_VIRTUAL_MONEY: {
      return {
        ...state,
        virtualMoney: action.payload
      }
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
    case SET_USER_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.payload
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
    case FETCH_CHECK_ACTUAL_USER_INFO_REQUEST:
    case FETCH_ADD_OR_UPDATE_USER_INFO_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetchError: false
      }
    case FETCH_CHECK_ACTUAL_USER_INFO_SUCCESS:
    case FETCH_ADD_OR_UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isFetching: false,
      }
    case FETCH_CHECK_ACTUAL_USER_INFO_FAILURE:
    case FETCH_ADD_OR_UPDATE_USER_INFO_FAILURE:
      return {
        ...state,
        isFetchError: true,
        isFetching: false,
      }
  }

  return state
}