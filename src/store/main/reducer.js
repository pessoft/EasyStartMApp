import { FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE } from './actions'

const defaultState = {
  dataLoaded: false,
  categories: [],
  products: {},
  deliverySettings: {},
  organizationSettings: {},
  stocks: []
}

export const mainReducer = (state = defaultState, action) => {

  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
  }

  return state
}