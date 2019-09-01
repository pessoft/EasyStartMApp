import { CHANGE_COLOR_THEME } from './actions'
import { IndigoTheme } from '../../style/themes/IndigoTheme'
import { GlobalFontSize } from '../../style/GlobalFontSize'

const defaultState = {
    theme: IndigoTheme,
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