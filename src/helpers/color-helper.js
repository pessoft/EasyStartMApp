import { processColor, Platform } from 'react-native'

export const getSVGColor = color => {
  if (Platform.OS === 'ios') {
    return processColor(color)
  }

  return color
}