import {
  FETCH_LOCATION_REQUEST,
  FETCH_LOCATION_SUCCESS,
  FETCH_LOCATION_FAILURE
} from './actions'

const defaultState = {
  isFetching: false,
  isFetchError: false,
  cities: {},
  cityBranches: {}

}

export const locationReducer = (state = defaultState, action) => {

  switch (action.type) {
    case FETCH_LOCATION_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetchError: false
      }
    case FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isFetching: false
      }
    case FETCH_LOCATION_FAILURE:
      return {
        ...state,
        isFetching: false,
        isFetchError: true
      }
  }

  return state
}