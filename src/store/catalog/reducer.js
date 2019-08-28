import { SET_SELECTED_CATEGORY, SET_SELECTED_PRODUCT } from './actions'

const defaultState = {
    selectedCategory: {},
    selectedProduct: {}
}

export const catalogReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_SELECTED_CATEGORY:
            return {
                ...state,
                selectedCategory: action.payload
            }
        case SET_SELECTED_PRODUCT:
            return {
                ...state,
                selectedProduct: action.payload
            }
    }

    return state
}