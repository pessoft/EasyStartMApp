import { CHANGE_COLOR_THEME } from './actions'
import { DarkTheme } from '../../style/themes/DarkTheme'
import { GlobalFontSize } from '../../style/GlobalFontSize'

export const defaultState = {
    theme: DarkTheme,
    fontSize: GlobalFontSize
}

export const styleReducer = (state = defaultState, action) => {

    switch (action.type) {
        case CHANGE_COLOR_THEME:
            return {
                ...state,
                theme: action.payload
            }
    }

    return state
}