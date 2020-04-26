import { StyleSheet, Dimensions } from 'react-native'
let width = Dimensions.get('screen').width - 42
let height = width * 0.5
const imageSize = parseInt(width / 5)
export default StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    width: width,
    minHeight: height,
    borderRadius: 4,
    borderWidth: 1,
    margin: 5
  },
  imageContainer: {
    flex: 0.3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 12
  },
  image: {
    width: imageSize,
    height: imageSize,
    borderRadius: 9999,
  },
  descriptionContainer: {
    flex: 0.7,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  fontBold: {
    fontWeight: 'bold'
  },
  positionRight: {
    alignSelf: 'flex-end'
  }

})