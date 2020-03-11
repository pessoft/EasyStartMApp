import { StyleSheet, Dimensions } from 'react-native'
let width = Dimensions.get('screen').width / 2 - 27
let height = width * 1.1
const imageSize = parseInt(width / 3)
export default StyleSheet.create({
  container: {
    position: 'relative',
    width: width,
    maxWidth: width,
    height: height,
    borderRadius: 6,
    borderWidth: 1,
    margin: 5,
  },
  imageContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 9999,
  },
  descriptionContainer: {
    flex: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  textAlignCenter: {
    textAlign: 'center'
  },
  additionalInfo: {
    fontWeight: 'bold'
  }
})