import {
  Animated,
  Dimensions,
  Easing
} from 'react-native'

export const timingAnimation = (value, toValue, duration = 160) => {
  Animated.timing(value, {
    toValue: toValue,
    duration: duration,
    easing: Easing.linear
  }).start()
}