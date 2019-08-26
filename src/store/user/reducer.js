import { SET_USER_PHONE_NUMBER, SET_CITY_ID, SET_BRANCH_ID, FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE } from './actions'

const defaultState = {
  asyncInfo: {
    isFetching: false,
    isErrorFetch: false
  },
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
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        asyncInfo: {
          isFetching: true,
          isErrorFetch: false,
        }
      }
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isLogin: action.payload,
        asyncInfo: {
          isFetching: false,
          isErrorFetch: false,
        }
      }
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        asyncInfo: {
          isFetching: false,
          isErrorFetch: true,
        }
      }
  }

  return state
}