import { MARK_FROM_BASKET } from './actions'

const defaultState = {
  fromBasket: false
}

export const navigationHelperReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MARK_FROM_BASKET:
      return {
        ...state,
        fromBasket: action.payload
      }
  }

  return state
}