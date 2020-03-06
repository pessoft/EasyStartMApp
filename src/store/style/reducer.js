import { CHANGE_COLOR_THEME } from './actions'
import { DarkTheme } from '../../style/themes/DarkTheme'
import { GlobalFontSize } from '../../style/GlobalFontSize'

const defaultState = {
    theme: DarkTheme,
    fontSize: GlobalFontSize
}

const isKeyEquals = theme => Object.keys(theme).length == Object.keys(defaultState.theme).length

export const styleReducer = (state = defaultState, action) => {

    switch (action.type) {
        case CHANGE_COLOR_THEME:
            return {
                ...state,
                theme: isDefaultKeyEquals(action.payload) ? action.payload : defaultState.theme
            }
    }

    return state
}