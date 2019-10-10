import { CHANGE_COLOR_THEME } from './actions'
import { GreenTheme } from '../../style/themes/GreenTheme'
import { GlobalFontSize } from '../../style/GlobalFontSize'

const defaultState = {
    theme: GreenTheme,
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