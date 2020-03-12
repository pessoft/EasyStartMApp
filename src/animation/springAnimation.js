import {
  Animated,
} from 'react-native'

export const springAnimation = (value, toValue = 0, delay = 0, friction = 7, useNativeDriver = false) => {
  Animated.spring(value, {
    toValue: toValue,
    delay: delay,
    friction: friction,
    useNativeDriver: useNativeDriver
  }).start()
}

export const springAnimationParallel = (value, toValue = 0, delay = 0, friction = 7, useNativeDriver = false) => {
  return Animated.spring(value, {
    toValue: toValue,
    delay: delay,
    friction: friction,
    useNativeDriver: useNativeDriver
  })
}