import { StyleSheet, Dimensions } from 'react-native'
let width = Dimensions.get('screen').width - 15
let height = width * 0.5
export default StyleSheet.create({
  container: {
    flexDirection:'row',
    width: width,
    height: height,
    borderRadius: 3,
    borderWidth: 2,
    margin: 5
  },
  imageContainer: {
    flex: 0.3,
    justifyContent: 'flex-start',
    paddingTop: 12
  },
  image: {
    flex: 0.48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999
  }
})