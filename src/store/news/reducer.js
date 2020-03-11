import { SET_SELECTED_NEWS } from './actions'

const defaultState = {
    selectedNews: {},
}

export const newsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_SELECTED_NEWS:
            return {
                ...state,
                selectedNews: action.payload
            }
    }

    return state
}