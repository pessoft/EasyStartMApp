import { FETCH_MAIN_DATA_SUCCESS } from './actions'

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
    case FETCH_MAIN_DATA_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
  }

  return state
}