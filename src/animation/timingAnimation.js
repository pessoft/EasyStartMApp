import {
  Animated,
  Easing
} from 'react-native'

export const timingAnimation = (value, toValue, duration = 300, useNativeDriver = false, callback) => {
  Animated.timing(value, {
    toValue: toValue,
    duration: duration,
    easing: Easing.easing,
    useNativeDriver: useNativeDriver
  }).start(callback)
}

export const timingAnimationParallel = (value, toValue, duration = 300, useNativeDriver = false) => {
  return Animated.timing(value, {
    toValue: toValue,
    duration: duration,
    easing: Easing.easing,
    useNativeDriver: useNativeDriver
  })
}