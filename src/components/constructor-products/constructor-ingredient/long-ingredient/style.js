import { StyleSheet, Dimensions } from 'react-native'
let width = Dimensions.get('screen').width - 15
let height = width * 0.5
export default StyleSheet.create({
  container: {
    width: width,
    height: height,
    borderRadius: 3,
    borderWidth: 2,
    margin: 5
  }
})