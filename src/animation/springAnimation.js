import {
  Animated,
  Dimensions
} from 'react-native'

export const springAnimation = (value, toValue = 0, delay = 0, friction = 7) => {
  Animated.spring(value, {
    toValue: toValue,
    delay: delay,
    friction: friction
  }).start()
}