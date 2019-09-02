import { store } from '../store/store'

const state = store.getState()
const style = state.style

export const defaultStyleNavigationStackOptions = {
  defaultNavigationOptions: {
    headerTitleStyle: {
      textAlign: "center",
      flex: 1,
      color: style.theme.textPrimaryColor.color
    },
    headerStyle: {
      backgroundColor: style.theme.darkPrimaryColor.backgroundColor,
      borderBottomColor: style.theme.dividerColor.borderColor,
      borderBottomWidth: 1,
    },
    headerTintColor: style.theme.textPrimaryColor.color,
  },
  cardStyle: {
    backgroundColor: style.theme.themeBody.backgroundColor,
  },
}
