import {
  SET_USER_PHONE_NUMBER,
  SET_CITY_ID, SET_BRANCH_ID,
  FETCH_CHECK_ACTUAL_USER_INFO_REQUEST,
  FETCH_CHECK_ACTUAL_USER_INFO_SUCCESS,
  FETCH_CHECK_ACTUAL_USER_INFO_FAILURE
} from './actions'

const defaultState = {
  isFetching: false,
  isFetchError: false,
  isLogin: false,
  phoneNumber: '',
  cityId: -1,
  branchId: -1,
  clientId: -1,
  placedOrders: false
}

export const userReducer = (state = defaultState, action) => {

  switch (action.type) {
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
    case FETCH_CHECK_ACTUAL_USER_INFO_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetchError: false
      }
    case FETCH_CHECK_ACTUAL_USER_INFO_SUCCESS:
      return {
        ...state,
        isLogin: action.payload,
        isFetching: false,
      }
    case FETCH_CHECK_ACTUAL_USER_INFO_FAILURE:
      return {
        ...state,
        isFetchError: true,
        isFetching: false,
      }
  }

  return state
}