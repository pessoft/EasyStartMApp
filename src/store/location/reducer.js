import { FETCH_LOCATION_SUCCESS } from './actions'

const defaultState = {
  dataLoaded: false,
  cities: {},
  cityBranches: {}

}

export const locationReducer = (state = defaultState, action) => {

  switch (action.type) {
    case FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
  }

  return state
}