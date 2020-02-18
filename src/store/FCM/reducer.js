import {
  FETCH_REGISTER_APP_WITH_FCM_REQUEST,
  FETCH_REGISTER_APP_WITH_FCM_SUCCESS,
  FETCH_REGISTER_APP_WITH_FCM_FAILURE,
  FETCH_REQUEST_PERMISSION_REQUEST,
  FETCH_REQUEST_PERMISSION_SUCCESS,
  FETCH_REQUEST_PERMISSION_FAILURE,
  SET_NOTIFICATION_ACTION_ON_EXECUTION,
  NOTIFICATION_ACTION_DONE
} from './actions'

const defaultState = {
  isFetching: false,
  isFetchError: false,
  granted: false,
  notificationAction: null
}

export const fcmReducer = (state = defaultState, action) => {

  switch (action.type) {
    case SET_NOTIFICATION_ACTION_ON_EXECUTION:
      return {
        ...state,
        notificationAction: action.payload
      }
    case NOTIFICATION_ACTION_DONE:
      return {
        ...state,
        notificationAction: null
      }
    case FETCH_REGISTER_APP_WITH_FCM_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetchError: false
      }
    case FETCH_REQUEST_PERMISSION_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetchError: false,
        granted: false
      }
    case FETCH_REGISTER_APP_WITH_FCM_SUCCESS:
      return {
        ...state,
        isFetching: false
      }
    case FETCH_REQUEST_PERMISSION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        granted: action.payload
      }
    case FETCH_REGISTER_APP_WITH_FCM_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFetchError: true
      }
    case FETCH_REQUEST_PERMISSION_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFetchError: true,
        granted: false
      }
  }

  return state
}