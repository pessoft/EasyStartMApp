import { StyleSheet, Dimensions } from 'react-native'
let width = Dimensions.get('screen').width / 2 - 15
let height = width * 1.25
export default StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    maxWidth: width,
    height: height,
    borderRadius: 3,
    borderWidth: 2,
    margin: 5,
  },
  imageContainer: {
    flex: 0.5,
    justifyContent: 'center'
  },
  image: {
    flex: 0.62,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999
  }
})