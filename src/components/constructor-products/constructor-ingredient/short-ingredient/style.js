import { StyleSheet, Dimensions } from 'react-native'
let width = Dimensions.get('screen').width / 2 - 15
let height = width * 1.05
export default StyleSheet.create({
  container: {
    position:'relative',
    width: width,
    maxWidth: width,
    height: height,
    borderRadius: 5,
    borderWidth: 3,
    margin: 5,
  },
  imageContainer: {
    flex: 0.5,
    justifyContent: 'center'
  },
  image: {
    flex: 0.82,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999
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