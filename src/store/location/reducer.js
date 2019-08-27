import { FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE } from './actions'

const defaultState = {
  dataLoaded: false,
  cities: {},
  cityBranches: {}

}

export const locationReducer = (state = defaultState, action) => {

  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
  }

  return state
}