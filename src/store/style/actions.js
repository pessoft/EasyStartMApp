export const CHANGE_COLOR_THEME = 'CHANGE_COLOR_THEME'

export const changeColorTheme = theme => {
    return {
        type: CHANGE_COLOR_THEME,
        payload: theme
    }
}