import {
  Animated,
  Easing
} from 'react-native'

export const timingAnimation = (value, toValue, duration = 160, useNativeDriver=false) => {
  Animated.timing(value, {
    toValue: toValue,
    duration: duration,
    easing: Easing.linear,
    useNativeDriver: useNativeDriver
  }).start()
}