import {
  Animated,
  Easing
} from 'react-native'

export const timingAnimation = (value, toValue, duration = 300, useNativeDriver = false, callback) => {
  Animated.timing(value, {
    toValue: toValue,
    duration: duration,
    easing: Easing.linear,
    useNativeDriver: useNativeDriver
  }).start(callback)
}