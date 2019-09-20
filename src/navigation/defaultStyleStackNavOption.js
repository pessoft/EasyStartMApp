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
      backgroundColor: style.theme.navigationHeader.backgroundColor,
      borderBottomColor: style.theme.dividerColor.borderColor,
      borderBottomWidth: 0,
    },
    headerTintColor: style.theme.textPrimaryColor.color,
    headerBackTitle: 'Назад',
    headerBackTitleStyle: {
      fontSize: style.fontSize.h9.fontSize
    }
  },
  cardStyle: {
    backgroundColor: style.theme.themeBody.backgroundColor,
  },
}
