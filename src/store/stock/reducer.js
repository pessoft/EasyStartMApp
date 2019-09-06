import { SET_SELECTED_STOCK } from './actions'

const defaultState = {
    selectedStock: {},
}

export const stockReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_SELECTED_STOCK:
            return {
                ...state,
                selectedStock: action.payload
            }
    }

    return state
}