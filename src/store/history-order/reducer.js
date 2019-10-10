import {
  FETCH_HISTORY_ORDER_SUCCESS,
  FETCH_HISTORY_ORDER_REQUEST,
  FETCH_HISTORY_ORDER_FAILURE,
  SET_SELECT_ORDER_ID
} from './actions'

const defaultState = {
  isFetching: false,
  isFetchError: false,
  history: [],
  selectOrder: {}
}

export const historyOrderReducer = (state = defaultState, action) => {

  switch (action.type) {
    case SET_SELECT_ORDER_ID:
      return {
        ...state,
        selectOrder: action.payload
      }
    case FETCH_HISTORY_ORDER_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetchError: false
      }
    case FETCH_HISTORY_ORDER_SUCCESS:
      return {
        ...state,
        history: action.payload,
        isFetching: false
      }
    case FETCH_HISTORY_ORDER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFetchError: true
      }
  }

  return state
}