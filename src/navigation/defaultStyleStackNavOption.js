import { store } from '../store/store'

export const defaultStyleNavigationStackOptions = style => ({
  defaultNavigationOptions: {
    headerTitleStyle: {
      textAlign: "center",
      flex: 1,
      // color: style.theme.textPrimaryColor.color,
    },
    headerStyle: {
      backgroundColor: style.theme.navigationHeader.backgroundColor,
      borderBottomColor: style.theme.dividerColor.borderColor,
      height: 50,
      borderBottomWidth: 0,
      
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS
    },
    headerTintColor: style.theme.textPrimaryColor.color,
    headerBackTitle: 'Назад',
    headerBackTitleStyle: {
      fontSize: style.fontSize.h8.fontSize
    }
  },
  cardStyle: {
    backgroundColor: style.theme.themeBody.backgroundColor,
  },
})
