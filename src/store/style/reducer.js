import { CHANGE_COLOR_THEME } from './actions'
import { BlueTheme } from '../../style/themes/BlueTheme'
import { GlobalFontSize } from '../../style/GlobalFontSize'

const defaultState = {
    theme: BlueTheme,
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