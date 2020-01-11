import { StyleSheet, Dimensions } from 'react-native'
let width = Dimensions.get('screen').width - 20
let height = width * 0.5
export default StyleSheet.create({
  container: {
    flexDirection:'row',
    width: width,
    height: height,
    borderRadius: 4,
    borderWidth: 3,
    margin: 5
  },
  imageContainer: {
    flex: 0.3,
    justifyContent: 'flex-start',
    paddingTop: 12
  },
  image: {
    flex: 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999
  },
  descriptionContainer: {
    flex: 0.7,
    justifyContent:'space-between',
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